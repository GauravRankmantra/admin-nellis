import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockOffers } from '../data/mockData';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const SpecialOffers = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [viewingOffer, setViewingOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dealership: '',
    banner: '',
    validUntil: '',
    terms: ''
  });

  const columns = [
    {
      header: 'Offer',
      accessor: 'title',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.title}</div>
          <div className="text-sm text-gray-500">{row.description}</div>
        </div>
      )
    },
    {
      header: 'Dealership',
      accessor: 'dealership',
      cell: (row) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {row.dealership}
        </span>
      )
    },
    {
      header: 'Valid Until',
      accessor: 'validUntil',
      cell: (row) => new Date(row.validUntil).toLocaleDateString()
    },
    {
      header: 'Status',
      accessor: 'validUntil',
      cell: (row) => {
        const isActive = new Date(row.validUntil) > new Date();
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isActive ? 'Active' : 'Expired'}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewingOffer(row)}
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
    setEditingOffer(null);
    setFormData({
      title: '',
      description: '',
      dealership: '',
      banner: '',
      validUntil: '',
      terms: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (offer) => {
    setEditingOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      dealership: offer.dealership,
      banner: offer.banner,
      validUntil: offer.validUntil,
      terms: offer.terms
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(offer => offer.id !== id));
      toast.success('Offer deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingOffer) {
      setOffers(offers.map(offer => 
        offer.id === editingOffer.id 
          ? { ...offer, ...formData }
          : offer
      ));
      toast.success('Offer updated successfully');
    } else {
      const newOffer = {
        id: Math.max(...offers.map(o => o.id)) + 1,
        ...formData
      };
      setOffers([...offers, newOffer]);
      toast.success('Offer added successfully');
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
    <Layout title="Special Offers">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
            <p className="text-gray-600">Manage promotional offers and deals</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Offer
          </button>
        </div>

        <Table
          columns={columns}
          data={offers}
          searchPlaceholder="Search offers..."
        />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingOffer ? 'Edit Special Offer' : 'Add Special Offer'}
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Dealership</label>
              <input
                type="text"
                name="dealership"
                value={formData.dealership}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Banner Image URL</label>
              <input
                type="url"
                name="banner"
                value={formData.banner}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/banner.jpg"
              />
            </div>

            <div>
              <label className="form-label">Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Terms & Conditions</label>
              <textarea
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                rows={3}
                className="form-input"
                placeholder="Terms and conditions for this offer..."
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
                {editingOffer ? 'Update' : 'Add'} Offer
              </button>
            </div>
          </form>
        </Modal>

        {/* View Modal */}
        <Modal
          isOpen={!!viewingOffer}
          onClose={() => setViewingOffer(null)}
          title="Offer Details"
          size="lg"
        >
          {viewingOffer && (
            <div className="space-y-4">
              {viewingOffer.banner && (
                <div className="mb-4">
                  <img
                    src={viewingOffer.banner}
                    alt={viewingOffer.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {viewingOffer.title}
                </h3>
                <p className="text-gray-600 mb-4">{viewingOffer.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500">Dealership</span>
                  <p>{viewingOffer.dealership}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Valid Until</span>
                  <p>{new Date(viewingOffer.validUntil).toLocaleDateString()}</p>
                </div>
              </div>

              {viewingOffer.terms && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Terms & Conditions</span>
                  <p className="text-sm text-gray-600 mt-1">{viewingOffer.terms}</p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default SpecialOffers;