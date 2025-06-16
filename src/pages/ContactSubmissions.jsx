import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockContactSubmissions } from '../data/mockData';
import { Eye, Mail, Phone, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState(mockContactSubmissions);
  const [viewingSubmission, setViewingSubmission] = useState(null);

  const statusColors = {
    'New': 'bg-blue-100 text-blue-800',
    'Responded': 'bg-green-100 text-green-800',
    'Archived': 'bg-gray-100 text-gray-800'
  };

  const columns = [
    {
      header: 'Contact',
      accessor: 'name',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <Mail className="w-3 h-3 mr-1" />
            {row.email}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Phone className="w-3 h-3 mr-1" />
            {row.phone}
          </div>
        </div>
      )
    },
    {
      header: 'Subject',
      accessor: 'subject',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.subject}</div>
          <div className="text-sm text-gray-500 truncate max-w-xs">
            {row.message}
          </div>
        </div>
      )
    },
    {
      header: 'Submitted',
      accessor: 'submittedAt',
      cell: (row) => {
        const date = new Date(row.submittedAt);
        return (
          <div>
            <div>{date.toLocaleDateString()}</div>
            <div className="text-sm text-gray-500">{date.toLocaleTimeString()}</div>
          </div>
        );
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[row.status]}`}>
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
            onClick={() => setViewingSubmission(row)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Eye className="w-4 h-4" />
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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      setSubmissions(submissions.filter(submission => submission.id !== id));
      toast.success('Submission deleted successfully');
    }
  };

  const updateStatus = (id, newStatus) => {
    setSubmissions(submissions.map(submission => 
      submission.id === id 
        ? { ...submission, status: newStatus }
        : submission
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  return (
    <Layout title="Contact Submissions">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Contact Submissions</h2>
            <p className="text-gray-600">View and manage contact form submissions</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    New Submissions
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {submissions.filter(s => s.status === 'New').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Responded
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {submissions.filter(s => s.status === 'Responded').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Submissions
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {submissions.length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={submissions}
          searchPlaceholder="Search submissions..."
        />

        {/* View Modal */}
        <Modal
          isOpen={!!viewingSubmission}
          onClose={() => setViewingSubmission(null)}
          title="Contact Submission Details"
          size="lg"
        >
          {viewingSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name</span>
                      <p className="text-gray-900">{viewingSubmission.name}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email</span>
                      <p className="text-gray-900">
                        <a 
                          href={`mailto:${viewingSubmission.email}`}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          {viewingSubmission.email}
                        </a>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Phone</span>
                      <p className="text-gray-900">
                        <a 
                          href={`tel:${viewingSubmission.phone}`}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          {viewingSubmission.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Submission Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Subject</span>
                      <p className="text-gray-900">{viewingSubmission.subject}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Submitted</span>
                      <p className="text-gray-900">
                        {new Date(viewingSubmission.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Status</span>
                      <p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[viewingSubmission.status]}`}>
                          {viewingSubmission.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {viewingSubmission.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex space-x-2">
                  <select
                    value={viewingSubmission.status}
                    onChange={(e) => updateStatus(viewingSubmission.id, e.target.value)}
                    className="form-input text-sm"
                  >
                    <option value="New">New</option>
                    <option value="Responded">Responded</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
                
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${viewingSubmission.email}?subject=Re: ${viewingSubmission.subject}`}
                    className="btn-primary flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </a>
                  <a
                    href={`tel:${viewingSubmission.phone}`}
                    className="btn-secondary flex items-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default ContactSubmissions;