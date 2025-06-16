import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockBusinesses } from '../data/mockData';
import { Plus, Edit, Trash2, Eye, Phone, Mail, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

const AutoBusinesses = () => {
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [viewingBusiness, setViewingBusiness] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    hours: '',
    services: ''
  });

  const businessTypes = [
    'Car Wash',
    'Parts Store',
    'Repair Shop',
    'Oil Change',
    'Tire Shop',
    'Body Shop',
    'Towing Service',
    'Insurance',
    'Financing',
    'Other'
  ];

  const columns = [
    {
      header: 'Business',
      accessor: 'name',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.address}</div>
        </div>
      )
    },
    {
      header: 'Type',
      accessor: 'type',
      cell: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {row.type}
        </span>
      )
    },
    {
      header: 'Contact',
      accessor: 'phone',
      cell: (row) => (
        <div className="text-sm">
          <div className="flex items-center text-gray-900">
            <Phone className="w-3 h-3 mr-1" />
            {row.phone}
          </div>
          <div className="flex items-center text-gray-500">
            <Mail className="w-3 h-3 mr-1" />
            {row.email}
          </div>
        </div>
      )
    },
    {
      header: 'Services',
      accessor: 'services',
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.services.slice(0, 2).map((service, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              {service}
            </span>
          ))}
          {row.services.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{row.services.length - 2}
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewingBusiness(row)}
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
    setEditingBusiness(null);
    setFormData({
      name: '',
      type: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      hours: '',
      services: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (business) => {
    setEditingBusiness(business);
    setFormData({
      name: business.name,
      type: business.type,
      address: business.address,
      phone: business.phone,
      email: business.email,
      website: business.website,
      hours: business.hours,
      services: business.services.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      setBusinesses(businesses.filter(business => business.id !== id));
      toast.success('Business deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const businessData = {
      ...formData,
      services: formData.services.split(',').map(s => s.trim()).filter(s => s)
    };

    if (editingBusiness) {
      setBusinesses(businesses.map(business => 
        business.id === editingBusiness.id 
          ? { ...business, ...businessData }
          : business
      ));
      toast.success('Business updated successfully');
    } else {
      const newBusiness = {
        id: Math.max(...businesses.map(b => b.id)) + 1,
        ...businessData
      };
      setBusinesses([...businesses, newBusiness]);
      toast.success('Business added successfully');
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
    <Layout title="Auto Businesses">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Auto Businesses</h2>
            <p className="text-gray-600">Directory of automotive businesses on Nellis Boulevard</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Business
          </button>
        </div>

        <Table
          columns={columns}
          data={businesses}
          searchPlaceholder="Search businesses..."
        />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingBusiness ? 'Edit Auto Business' : 'Add Auto Business'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Business Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="">Select type</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="form-label">Hours</label>
              <input
                type="text"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                className="form-input"
                placeholder="Mon-Fri: 8AM-6PM, Sat: 9AM-5PM"
                required
              />
            </div>

            <div>
              <label className="form-label">Services (comma-separated)</label>
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleChange}
                className="form-input"
                placeholder="Oil Change, Brake Service, Tire Installation"
                required
              />
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
                {editingBusiness ? 'Update' : 'Add'} Business
              </button>
            </div>
          </form>
        </Modal>

        {/* View Modal */}
        <Modal
          isOpen={!!viewingBusiness}
          onClose={() => setViewingBusiness(null)}
          title="Business Details"
          size="lg"
        >
          {viewingBusiness && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {viewingBusiness.name}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  {viewingBusiness.type}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Address</span>
                  <p className="text-gray-900">{viewingBusiness.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{viewingBusiness.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{viewingBusiness.email}</span>
                    </div>
                    {viewingBusiness.website && (
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <a
                          href={viewingBusiness.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Business Hours</h4>
                    <p className="text-gray-600">{viewingBusiness.hours}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewingBusiness.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default AutoBusinesses;