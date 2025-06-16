import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockInventory } from '../data/mockData';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Inventory = () => {
  const [inventory, setInventory] = useState(mockInventory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    dealer: '',
    condition: '',
    transmission: '',
    fuelType: '',
    images: []
  });

  const columns = [
    {
      header: 'Vehicle',
      accessor: 'brand',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">
            {row.year} {row.brand} {row.model}
          </div>
          <div className="text-sm text-gray-500">{row.condition}</div>
        </div>
      )
    },
    {
      header: 'Mileage',
      accessor: 'mileage',
      cell: (row) => `${row.mileage.toLocaleString()} mi`
    },
    {
      header: 'Price',
      accessor: 'price',
      cell: (row) => (
        <span className="font-medium text-green-600">
          ${row.price.toLocaleString()}
        </span>
      )
    },
    {
      header: 'Dealer',
      accessor: 'dealer',
      cell: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.dealer}
        </span>
      )
    },
    {
      header: 'Transmission',
      accessor: 'transmission'
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewingVehicle(row)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(row)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormData({
      brand: '',
      model: '',
      year: '',
      mileage: '',
      price: '',
      dealer: '',
      condition: '',
      transmission: '',
      fuelType: '',
      images: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year.toString(),
      mileage: vehicle.mileage.toString(),
      price: vehicle.price.toString(),
      dealer: vehicle.dealer,
      condition: vehicle.condition,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      images: vehicle.images || []
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setInventory(inventory.filter(vehicle => vehicle.id !== id));
      toast.success('Vehicle deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const vehicleData = {
      ...formData,
      year: parseInt(formData.year),
      mileage: parseInt(formData.mileage),
      price: parseInt(formData.price)
    };

    if (editingVehicle) {
      setInventory(inventory.map(vehicle => 
        vehicle.id === editingVehicle.id 
          ? { ...vehicle, ...vehicleData }
          : vehicle
      ));
      toast.success('Vehicle updated successfully');
    } else {
      const newVehicle = {
        id: Math.max(...inventory.map(v => v.id)) + 1,
        ...vehicleData
      };
      setInventory([...inventory, newVehicle]);
      toast.success('Vehicle added successfully');
    }
    
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout title="Inventory Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vehicle Inventory</h2>
            <p className="text-gray-600">Manage used car listings and inventory</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </button>
        </div>

        <Table
          columns={columns}
          data={inventory}
          searchPlaceholder="Search vehicles..."
        />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="form-label">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-input"
                  min="1900"
                  max="2025"
                  required
                />
              </div>
              <div>
                <label className="form-label">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-input"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Dealer</label>
                <input
                  type="text"
                  name="dealer"
                  value={formData.dealer}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
              <div>
                <label className="form-label">Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select fuel type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingVehicle ? 'Update' : 'Add'} Vehicle
              </button>
            </div>
          </form>
        </Modal>

        {/* View Modal */}
        <Modal
          isOpen={!!viewingVehicle}
          onClose={() => setViewingVehicle(null)}
          title="Vehicle Details"
          size="lg"
        >
          {viewingVehicle && (
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                {viewingVehicle.images && viewingVehicle.images[0] && (
                  <img
                    src={viewingVehicle.images[0]}
                    alt={`${viewingVehicle.brand} ${viewingVehicle.model}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Vehicle</span>
                  <p className="text-lg font-semibold">
                    {viewingVehicle.year} {viewingVehicle.brand} {viewingVehicle.model}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Price</span>
                  <p className="text-lg font-semibold text-green-600">
                    ${viewingVehicle.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Mileage</span>
                  <p>{viewingVehicle.mileage.toLocaleString()} miles</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Condition</span>
                  <p>{viewingVehicle.condition}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Transmission</span>
                  <p>{viewingVehicle.transmission}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Fuel Type</span>
                  <p>{viewingVehicle.fuelType}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-gray-500">Dealer</span>
                  <p>{viewingVehicle.dealer}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default Inventory;