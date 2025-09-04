import React, { useState } from 'react';

// Assuming this component receives a prop like `isColor` to be rendered
const ColorSelector = ({ isColor }) => {
  // 1. Define the state to hold the array of selected color names
  const [selectedColors, setSelectedColors] = useState([]);

  // Mock data for the colors object (key: color name, value: hex code)
  const colors = {
    'Deep Red': '#B71C1C',
    'Ocean Blue': '#0D47A1',
    'Forest Green': '#1B5E20',
    'Sunny Yellow': '#F57F17',
    'Classic Black': '#000000',
    'Pure White': '#FFFFFF',
  };

  // 2. The handler function to add/remove colors from the state
  const handleColorCheckboxChange = (colorName) => {
    setSelectedColors((prevSelected) =>
      // If the color is already selected, filter it out (remove it)
      prevSelected.includes(colorName)
        ? prevSelected.filter((name) => name !== colorName)
        // Otherwise, add the new color to the array
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
          {/* 3. Use Object.entries to map over the colors object */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(colors).map(([name, code]) => (
              <label
                key={name} // 4. Use the unique color name as the key
                className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer transition-all duration-150 hover:border-blue-500"
              >
                {/* We still use a checkbox for accessibility, but hide it visually */}
                <input
                  type="checkbox"
                  checked={selectedColors.includes(name)}
                  onChange={() => handleColorCheckboxChange(name)}
                  className="sr-only" // Screen-reader only, visually hidden
                />
                
                {/* 5. This div is our visible "checkbox" or color swatch */}
                <div
                  className={`w-6 h-6 rounded-md border transition-all ${
                    // Add a visible border for white to distinguish it from the background
                    code === '#FFFFFF' ? 'border-gray-400' : 'border-transparent'
                  } ${
                    // 6. Add a ring to indicate selection
                    selectedColors.includes(name)
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
