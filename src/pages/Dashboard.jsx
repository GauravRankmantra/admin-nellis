import Layout from '../components/layout/Layout';
import { mockStats } from '../data/mockData';
import { 
  Car, 
  Building, 
  Wrench, 
  FileText, 
  Mail, 
  Video,
  TrendingUp,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      name: 'Total Cars',
      value: mockStats.totalCars,
      change: '+12%',
      changeType: 'positive',
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      name: 'Dealerships',
      value: mockStats.totalDealers,
      change: '+2',
      changeType: 'positive',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      name: 'Service Bookings',
      value: mockStats.serviceBookings,
      change: '+8%',
      changeType: 'positive',
      icon: Wrench,
      color: 'bg-yellow-500'
    },
    {
      name: 'Monthly Inquiries',
      value: mockStats.monthlyInquiries,
      change: '+15%',
      changeType: 'positive',
      icon: Mail,
      color: 'bg-purple-500'
    },
    {
      name: 'Blog Posts',
      value: mockStats.blogPosts,
      change: '+3',
      changeType: 'positive',
      icon: FileText,
      color: 'bg-indigo-500'
    },
    {
      name: 'Weekly Specials',
      value: mockStats.weeklySpecials,
      change: '+2',
      changeType: 'positive',
      icon: Video,
      color: 'bg-red-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New car added to inventory',
      details: '2021 Toyota Camry - $24,999',
      time: '2 hours ago',
      type: 'inventory'
    },
    {
      id: 2,
      action: 'Service booking received',
      details: 'John Smith - Oil Change',
      time: '4 hours ago',
      type: 'service'
    },
    {
      id: 3,
      action: 'New blog post published',
      details: 'Top 5 Used Cars Under $20,000',
      time: '1 day ago',
      type: 'blog'
    },
    {
      id: 4,
      action: 'Contact form submission',
      details: 'Sarah Wilson - Service inquiry',
      time: '2 days ago',
      type: 'contact'
    }
  ];

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="stat-card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {stat.change}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'inventory' ? 'bg-blue-500' :
                      activity.type === 'service' ? 'bg-yellow-500' :
                      activity.type === 'blog' ? 'bg-indigo-500' :
                      'bg-purple-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.details}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900">Add New Vehicle</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Video className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-gray-900">Upload Weekly Special</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-900">Create Blog Post</span>
                </div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Add Dealership</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;