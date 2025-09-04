import { useState } from "react";
import { useProfile } from "../../context/hooks/profile";
import { Eye, EyeOff, MapPin, Phone, Plus, Save, X } from "lucide-react";

interface Address{
  pin:string;
  other:string;
}


const AdditionalDetails: React.FC = () => {
  const { getPhone, getAddress, handleAddPhone, handleAddAddress, loading } = useProfile();
  
  const [showAllPhones, setShowAllPhones] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState({ pin: '', other: '' });

  const phones = getPhone();
  const addresses = getAddress();

  const handleSavePhone = () => {
    if (newPhone.trim()) {
      handleAddPhone(newPhone.trim());
      setNewPhone('');
      setShowPhoneForm(false);
    }
  };

  const handleSaveAddress = () => {
    if (newAddress.pin.trim() && newAddress.other.trim()) {
      handleAddAddress({
        pin: newAddress.pin.trim(),
        other: newAddress.other.trim()
      });
      setNewAddress({ pin: '', other: '' });
      setShowAddressForm(false);
    }
  };

  console.log("phones are ",phones);
  const displayedPhones = showAllPhones ? phones : phones.slice(0, 1) || [];
  console.log("displayed phones are ",displayedPhones);
 
  const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 1) || [];

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-12">
  <h2 className="text-xl font-semibold text-gray-800">More Details</h2>

  {/* Phone Numbers Section */}
  <div className="border-b pb-8">
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <Phone className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-700 text-lg">Phone Numbers</h3>
      </div>
      <button
        onClick={() => setShowPhoneForm(!showPhoneForm)}
        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </div>

    {/* Phone Form */}
    {showPhoneForm && (
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-blue-200 space-y-4">
        <input
          type="tel"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          placeholder="Enter phone number"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={handleSavePhone}
            disabled={!newPhone.trim() || loading}
            className="flex items-center justify-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={() => {
              setShowPhoneForm(false);
              setNewPhone('');
            }}
            className="flex items-center justify-center gap-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Phone List */}
    <div className="space-y-2">
      {phones.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No phone numbers added yet</p>
      ) : (
        displayedPhones.map((phone: string, index: number) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 font-mono break-all">{phone}</span>
            {index === 0 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Primary</span>
            )}
          </div>
        ))
      )}
    </div>

    {/* See All Button */}
    {phones.length > 1 && (
      <div className="mt-4">
        <button
          onClick={() => setShowAllPhones(!showAllPhones)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors"
        >
          {showAllPhones ? (
            <>
              <EyeOff className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              See All
            </>
          )}
        </button>
      </div>
    )}
  </div>

  {/* Addresses Section */}
  <div>
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-green-600" />
        <h3 className="font-medium text-gray-700 text-lg">Addresses</h3>
      </div>
      <button
        onClick={() => setShowAddressForm(!showAddressForm)}
        className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </div>

    {/* Address Form */}
    {showAddressForm && (
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border-2 border-green-200 space-y-4">
        <input
          type="text"
          value={newAddress.pin}
          onChange={(e) => setNewAddress({ ...newAddress, pin: e.target.value })}
          placeholder="PIN Code"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          value={newAddress.other}
          onChange={(e) => setNewAddress({ ...newAddress, other: e.target.value })}
          placeholder="Enter complete address"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={handleSaveAddress}
            disabled={!newAddress.pin.trim() || !newAddress.other.trim() || loading}
            className="flex items-center justify-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            <Save className="w-4 h-4" />
            Save Address
          </button>
          <button
            onClick={() => {
              setShowAddressForm(false);
              setNewAddress({ pin: '', other: '' });
            }}
            className="flex items-center justify-center gap-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    )}

    {/* Address List */}
    <div className="space-y-3">
      {addresses.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No addresses added yet</p>
      ) : (
        displayedAddresses.map((address: Address, index: number) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-800">PIN: {address.pin}</span>
                    {index === 0 && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mt-1 break-words">{address.other}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>

    {/* See All Button */}
    {addresses.length > 1 && (
      <div className="mt-4">
        <button
          onClick={() => setShowAllAddresses(!showAllAddresses)}
          className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 transition-colors"
        >
          {showAllAddresses ? (
            <>
              <EyeOff className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              See All
            </>
          )}
        </button>
      </div>
    )}
  </div>
</div>

  );
};

export default AdditionalDetails;