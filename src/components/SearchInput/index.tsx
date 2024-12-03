import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { ChangeEvent, useDeferredValue, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from '../ui/separator';

interface SearchOption {
    label: string;
    value: string;
}

interface SearchInputProps {
    onChange: (value: string, selectedOption: string) => void;
    onSelect?: (option: string) => void;
    options?: SearchOption[];
    placeholder?: string;
    className?: string;
    buttonText?: string;
    defaultOption?: string;
}

function SearchInput({
    onChange,
    onSelect,
    options = [],
    placeholder = 'Search...',
    className,
    buttonText = 'Search',
    defaultOption
}: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(defaultOption || options[0]?.value);
    const deferredSearchTerm = useDeferredValue(searchTerm);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleSearch = () => {
        onChange(deferredSearchTerm, selectedOption);
    };

    const handleOptionChange = (value: string) => {
        setSelectedOption(value);
        onSelect?.(value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
        handleSearch();
        }
    };

    return (
        <div className={cn('relative w-full shadow-sm h-10 border border-gray-200 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700', className)}>
        <div className="flex items-center h-full">
            <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                autoComplete='off'
                autoCorrect='off'
                autoCapitalize='off'
                spellCheck='false'
                autoFocus={false}
                name="search"
                placeholder={placeholder}
                className="w-full min-w-[250px] rounded-l-md border-0 pl-10 pr-4 text-sm focus:outline-none dark:bg-gray-800 dark:text-white"
            />
            </div>

            {searchTerm && (
                <>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            onChange('', selectedOption);
                        }}
                        className="px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hint--top"
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                    <Separator orientation="vertical" className="h-4 dark:bg-gray-700" />
                </>
            )}

            {options.length > 0 ? <>
                <Separator orientation="vertical" className="h-4 dark:bg-gray-700" />

                <Select value={selectedOption} onValueChange={handleOptionChange}>
                    <SelectTrigger className="border-0 shadow-none px-2 text-sm focus:outline-none focus:ring-0 min-w-[100px] rounded-none">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            <span className="text-xs uppercase font-medium">{option.label}</span>
                        </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
             </> : null}

            <Separator orientation="vertical" className="h-full dark:bg-gray-700" />

            <button
            onClick={handleSearch}
            className="rounded-r-md border-0 px-4 h-full text-sm font-medium hover:bg-gray-50 focus:outline-none flex items-center gap-2 dark:hover:bg-gray-700"
            >
            {buttonText}
            </button>
        </div>
        </div>
    );
}


export default SearchInput;
