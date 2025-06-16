import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockBlogPosts } from '../data/mockData';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const CommunityBlog = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: '',
    tags: '',
    status: 'Published'
  });

  const columns = [
    {
      header: 'Post',
      accessor: 'title',
      cell: (row) => (
        <div className="flex items-center space-x-3">
          {row.image && (
            <img
              src={row.image}
              alt={row.title}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <div>
            <div className="font-medium text-gray-900">{row.title}</div>
            <div className="text-sm text-gray-500">By {row.author}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Publish Date',
      accessor: 'publishDate',
      cell: (row) => new Date(row.publishDate).toLocaleDateString()
    },
    {
      header: 'Tags',
      accessor: 'tags',
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {tag}
            </span>
          ))}
          {row.tags.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{row.tags.length - 2}
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Published' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewingPost(row)}
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
    setEditingPost(null);
    setFormData({
      title: '',
      content: '',
      author: 'Admin',
      image: '',
      tags: '',
      status: 'Published'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      image: post.image,
      tags: post.tags.join(', '),
      status: post.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== id));
      toast.success('Post deleted successfully');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      publishDate: editingPost ? editingPost.publishDate : new Date().toISOString().split('T')[0]
    };

    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData }
          : post
      ));
      toast.success('Post updated successfully');
    } else {
      const newPost = {
        id: Math.max(...posts.map(p => p.id)) + 1,
        ...postData
      };
      setPosts([...posts, newPost]);
      toast.success('Post created successfully');
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
    <Layout title="Community Blog">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Community Blog</h2>
            <p className="text-gray-600">Manage blog posts and community content</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </button>
        </div>

        <Table
          columns={columns}
          data={posts}
          searchPlaceholder="Search posts..."
        />

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingPost ? 'Edit Blog Post' : 'Create Blog Post'}
          size="xl"
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
              <label className="form-label">Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="form-input"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="form-label">Featured Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-input"
                placeholder="Used Cars, Tips, Maintenance"
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
                {editingPost ? 'Update' : 'Create'} Post
              </button>
            </div>
          </form>
        </Modal>

        {/* View Modal */}
        <Modal
          isOpen={!!viewingPost}
          onClose={() => setViewingPost(null)}
          title="Blog Post Preview"
          size="xl"
        >
          {viewingPost && (
            <div className="space-y-6">
              {viewingPost.image && (
                <div className="mb-6">
                  <img
                    src={viewingPost.image}
                    alt={viewingPost.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {viewingPost.title}
                </h1>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <span>By {viewingPost.author}</span>
                  <span>•</span>
                  <span>{new Date(viewingPost.publishDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    viewingPost.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {viewingPost.status}
                  </span>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {viewingPost.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {viewingPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default CommunityBlog;