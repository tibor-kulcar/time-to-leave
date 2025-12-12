'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { mdiMagnify, mdiClose } from '@mdi/js';
import clsx from 'clsx';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { StopItem } from '@/types';
import dataset from '@/public/data/pid-stops.json';

const allStops: StopItem[] = dataset;
const MAX_RESULTS = 10;

// Normalize text for search (remove accents, lowercase, alphanumeric only)
const normalize = (str: string) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};

// Pre-compute normalized labels for faster filtering
const normalizedStops = allStops.map((stop) => ({
  ...stop,
  normalizedLabel: normalize(stop.label),
}));

interface StopComboboxProps {
  value?: StopItem;
  lastSearch: StopItem[];
  isLoading?: boolean;
  onChange: (stop: StopItem | null) => void;
  onRemove?: (value: string) => void;
}

export function StopCombobox({
  value,
  lastSearch,
  isLoading = false,
  onChange,
  onRemove,
}: StopComboboxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const justFocusedRef = useRef(false);

  // Filter stops based on search term - optimized for performance
  const filteredStops = useMemo(() => {
    if (!searchTerm) {
      return lastSearch.length > 0
        ? lastSearch.slice(0, MAX_RESULTS)
        : allStops.slice(0, MAX_RESULTS);
    }

    const normalizedSearch = normalize(searchTerm);
    const results: StopItem[] = [];

    // Early exit: stop once we have enough results
    // Use pre-normalized labels for faster comparison
    for (let i = 0; i < normalizedStops.length && results.length < MAX_RESULTS; i++) {
      if (normalizedStops[i].normalizedLabel.startsWith(normalizedSearch)) {
        results.push(allStops[i]);
      }
    }

    return results;
  }, [searchTerm, lastSearch]);

  // Handle selection
  const handleSelect = useCallback(
    (stop: StopItem) => {
      onChange(stop);
      setSearchTerm('');
      setSelectedIndex(-1);
      setIsOpen(false);
      inputRef.current?.blur();
    },
    [onChange]
  );

  // Handle remove - keep dropdown open
  const handleRemove = useCallback(
    (e: React.MouseEvent, stopValue: string) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove?.(stopValue);
      // Refocus input - onFocus handler will reopen dropdown
      inputRef.current?.focus();
    },
    [onRemove]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Open dropdown with arrow keys if closed
      if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        setIsOpen(true);
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredStops.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && filteredStops[selectedIndex]) {
            handleSelect(filteredStops[selectedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, selectedIndex, filteredStops, handleSelect]
  );

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedElement?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        inputRef.current &&
        !inputRef.current.contains(target) &&
        listRef.current &&
        !listRef.current.contains(target)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      if (!isOpen) setIsOpen(true);
      setSelectedIndex(-1);
    },
    [isOpen]
  );

  const handleFocus = useCallback(() => {
    justFocusedRef.current = true;
    setIsOpen(true);
  }, []);

  const handleClick = useCallback(() => {
    // Only toggle if we didn't just focus
    if (!justFocusedRef.current) {
      setIsOpen((prev) => !prev);
    }
    justFocusedRef.current = false;
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center mx-2 bg-white dark:bg-black transition-colors">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          name="search_query"
          onChange={handleChange}
          onFocus={handleFocus}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          placeholder={value?.label || 'Search'}
          className="w-full px-4 py-3 bg-transparent outline-hidden text-3xl text-black dark:text-white placeholder:text-gray-500 focus:placeholder:text-gray-700"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="stops-listbox"
          aria-activedescendant={
            selectedIndex >= 0 ? `stop-${selectedIndex}` : undefined
          }
        />
        <div className="pr-3" aria-hidden="true">
          {isLoading ? (
            <Spinner />
          ) : (
            <Icon icon={mdiMagnify} className="w-8 h-8" />
          )}
        </div>
      </div>

      {isOpen && (
        <ul
          ref={listRef}
          id="stops-listbox"
          role="listbox"
          className="absolute z-50 w-full h-[calc(100vh-(--spacing(16)))] mt-1 bg-white dark:bg-black overflow-auto shadow-lg"
        >
          {filteredStops.length === 0 ? (
            <li className="px-4 py-3 text-gray-500 text-center" role="option">
              No stops found
            </li>
          ) : (
            filteredStops.map((stop, index) => {
              const isInLastSearch =
                !searchTerm &&
                lastSearch.some((item) => item.value === stop.value);

              return (
                <li
                  key={stop.value}
                  id={`stop-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(stop);
                  }}
                  className={clsx(
                    'px-6 py-3 cursor-pointer transition-colors flex items-center justify-between text-3xl',
                    index === selectedIndex
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-900'
                  )}
                >
                  <span>{stop.label}</span>

                  {isInLastSearch && onRemove && (
                    <button
                      type="button"
                      onMouseDown={(e) => handleRemove(e, stop.value)}
                      className={clsx(
                        'p-1 rounded-full transition-all',
                        index === selectedIndex
                          ? 'bg-white/20 dark:bg-black/20'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                      )}
                      aria-label={`Remove ${stop.label} from history`}
                      title="Remove from history"
                    >
                      <Icon icon={mdiClose} className="w-5 h-5" />
                    </button>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
