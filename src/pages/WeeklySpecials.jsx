import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockWeeklySpecials } from '../data/mockData';
import { Plus, Edit, Trash2, Play } from 'lucide-react';
import toast from 'react-hot-toast';

const WeeklySpecials = () => {
  const [specials, setSpecials] = useState(mockWeeklySpecials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpecial, setEditingSpecial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    dealership: '',
    videoUrl: '',
    description: '',
    date: ''
  });

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      cell: (row) => (
        <div className="font-medium text-gray-900">{row.title}</div>
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
      header: 'Date',
      accessor: 'date',
      cell: (row) => new Date(row.date).toLocaleDateString()
    },
    {
      header: 'Video',
      accessor: 'videoUrl',
      cell: (row) => (
        <a
          href={row.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          <Play className="w-4 h-4 mr-1" />
          View
        </a>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <div className="flex items-center space-x-2">
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
    setEditingSpecial(null);
    setFormData({
      title: '',
      dealership: '',
      videoUrl: '',
      description: '',
      date: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (special) => {
    setEditingSpecial(special);
    setFormData({
      title: special.title,
      dealership: special.dealership,
      videoUrl: special.videoUrl,
      description: special.description,
      date: special.date
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this special?')) {
      setSpecials(specials.filter(special => special.id !== id));
      toast.success('Special deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSpecial) {
      setSpecials(specials.map(special => 
        special.id === editingSpecial.id 
          ? { ...special, ...formData }
          : special
      ));
      toast.success('Special updated successfully');
    } else {
      const newSpecial = {
        id: Math.max(...specials.map(s => s.id)) + 1,
        ...formData
      };
      setSpecials([...specials, newSpecial]);
      toast.success('Special added successfully');
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
    <Layout title="Weekly Specials">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Weekly Specials</h2>
            <p className="text-gray-600">Manage weekly promotional videos and offers</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Special
          </button>
        </div>

        <Table
          columns={columns}
          data={specials}
          searchPlaceholder="Search specials..."
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingSpecial ? 'Edit Weekly Special' : 'Add Weekly Special'}
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
              <label className="form-label">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://www.youtube.com/embed/..."
                required
              />
            </div>

            <div>
              <label className="form-label">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
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

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingSpecial ? 'Update' : 'Add'} Special
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default WeeklySpecials;