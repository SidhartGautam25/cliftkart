import React from 'react';
import { Colors } from '../../../utils/colors';

// 1. Update the props interface to accept the state and its setter function
interface ColorSelectorProps {
  isColor: boolean;
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
}

// 2. Destructure the new props
const ColorSelector: React.FC<ColorSelectorProps> = ({
  isColor,
  selectedColors,
  setSelectedColors,
}) => {
  // 3. The internal useState hook is now removed from this component.

  // This function now calls the setSelectedColors function from the parent's props
  const handleColorCheckboxChange = (colorName: string): void => {
    setSelectedColors((prevSelected) =>
      prevSelected.includes(colorName)
        ? prevSelected.filter((name) => name !== colorName)
        : [...prevSelected, colorName]
    );
  };

  return (
    <>
      {isColor && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Select Colors for this item
          </label>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {Object.entries(Colors).map(([name, code]) => (
              <label
                key={name}
                className="flex items-center space-x-1 p-1 border rounded-lg cursor-pointer transition-all duration-150 hover:border-blue-500"
              >
                <input
                  type="checkbox"
                  // 4. `checked` now uses the `selectedColors` prop
                  checked={selectedColors.includes(name)}
                  onChange={() => handleColorCheckboxChange(name)}
                  className="sr-only"
                />

                <div
                  className={`w-3 h-3 rounded-md border transition-all ${
                    code === '#FFFFFF' ? 'border-gray-400' : 'border-transparent'
                  } ${
                    selectedColors.includes(name) // This also uses the prop
                      ? 'ring-2 ring-offset-1 ring-blue-500'
                      : ''
                  }`}
                  style={{ backgroundColor: code }}
                ></div>

                <span className="text-sm text-gray-800">{name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ColorSelector;
