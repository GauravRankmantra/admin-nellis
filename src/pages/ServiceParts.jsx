import { useState } from 'react';
import Layout from '../components/layout/Layout';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import { mockServiceBookings } from '../data/mockData';
import { Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const ServiceParts = () => {
  const [bookings, setBookings] = useState(mockServiceBookings);
  const [viewingBooking, setViewingBooking] = useState(null);

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-green-100 text-green-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  const columns = [
    {
      header: 'Customer',
      accessor: 'customerName',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.customerName}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
          <div className="text-sm text-gray-500">{row.phone}</div>
        </div>
      )
    },
    {
      header: 'Service',
      accessor: 'service',
      cell: (row) => (
        <div>
          <div className="font-medium text-gray-900">{row.service}</div>
          <div className="text-sm text-gray-500">{row.vehicle}</div>
        </div>
      )
    },
    {
      header: 'Preferred Date',
      accessor: 'preferredDate',
      cell: (row) => new Date(row.preferredDate).toLocaleDateString()
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
            onClick={() => setViewingBooking(row)}
            className="text-blue-600 hover:text-blue-900"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status === 'Pending' && (
            <>
              <button
                onClick={() => updateStatus(row.id, 'Confirmed')}
                className="text-green-600 hover:text-green-900"
                title="Confirm"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStatus(row.id, 'Cancelled')}
                className="text-red-600 hover:text-red-900"
                title="Cancel"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          {row.status === 'Confirmed' && (
            <button
              onClick={() => updateStatus(row.id, 'Completed')}
              className="text-blue-600 hover:text-blue-900"
              title="Mark Complete"
            >
              <Clock className="w-4 h-4" />
            </button>
          )}
        </div>
      )
    }
  ];

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(booking => 
      booking.id === id 
        ? { ...booking, status: newStatus }
        : booking
    ));
    toast.success(`Booking ${newStatus.toLowerCase()} successfully`);
  };

  return (
    <Layout title="Service & Parts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Service & Parts</h2>
            <p className="text-gray-600">Manage service bookings and parts inventory</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {bookings.filter(b => b.status === 'Pending').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Confirmed
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {bookings.filter(b => b.status === 'Confirmed').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Completed
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {bookings.filter(b => b.status === 'Completed').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <XCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Cancelled
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {bookings.filter(b => b.status === 'Cancelled').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          data={bookings}
          searchPlaceholder="Search bookings..."
        />

        {/* View Modal */}
        <Modal
          isOpen={!!viewingBooking}
          onClose={() => setViewingBooking(null)}
          title="Service Booking Details"
          size="lg"
        >
          {viewingBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Customer Information</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Name</span>
                      <p>{viewingBooking.customerName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email</span>
                      <p>{viewingBooking.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Phone</span>
                      <p>{viewingBooking.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Service Details</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Service</span>
                      <p>{viewingBooking.service}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Vehicle</span>
                      <p>{viewingBooking.vehicle}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Preferred Date</span>
                      <p>{new Date(viewingBooking.preferredDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Status</span>
                      <p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[viewingBooking.status]}`}>
                          {viewingBooking.status}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {viewingBooking.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {viewingBooking.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t">
                {viewingBooking.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => {
                        updateStatus(viewingBooking.id, 'Confirmed');
                        setViewingBooking(null);
                      }}
                      className="btn-primary"
                    >
                      Confirm Booking
                    </button>
                    <button
                      onClick={() => {
                        updateStatus(viewingBooking.id, 'Cancelled');
                        setViewingBooking(null);
                      }}
                      className="btn-danger"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {viewingBooking.status === 'Confirmed' && (
                  <button
                    onClick={() => {
                      updateStatus(viewingBooking.id, 'Completed');
                      setViewingBooking(null);
                    }}
                    className="btn-primary"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};

export default ServiceParts;