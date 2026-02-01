import React, { useState } from "react";
import "../../assets/css/Cart/MyOrders.css";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  ChefHat, 
  MapPin, 
  CreditCard, 
  Star, 
  Filter, 
  ChevronLeft,
  RefreshCw,
  MessageCircle,
  Phone,
  ShoppingBag,
  AlertCircle,
  XCircle
} from "lucide-react";
import ordersData from "../../data/cart/orders.json";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurant: string;
  status: string;
  statusText: string;
  date: string;
  time: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  riderName: string | null;
  riderPhone: string | null;
  paymentMethod: string;
  estimatedDelivery: string;
  actualDelivery: string | null;
  rating: number | null;
  canReorder: boolean;
}

const MyOrders: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return '#22c55e';
      case 'preparing': return '#f97316';
      case 'on_the_way': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={20} />;
      case 'preparing': return <ChefHat size={20} />;
      case 'on_the_way': return <Truck size={20} />;
      case 'cancelled': return <XCircle size={20} />;
      default: return <Package size={20} />;
    }
  };

  const filterOrders = (orders: Order[]) => {
    if (activeFilter === "All") return orders;
    if (activeFilter === "Pending") return orders.filter(o => o.status === "preparing");
    if (activeFilter === "Preparing") return orders.filter(o => o.status === "preparing");
    if (activeFilter === "On The Way") return orders.filter(o => o.status === "on_the_way");
    if (activeFilter === "Delivered") return orders.filter(o => o.status === "delivered");
    if (activeFilter === "Cancelled") return orders.filter(o => o.status === "cancelled");
    return orders;
  };

  const filteredOrders = filterOrders(ordersData.orders);

  const reorder = (orderId: string) => {
    console.log(`Reordering order ${orderId}`);
    // Reorder logic
  };

  const trackOrder = (orderId: string) => {
    console.log(`Tracking order ${orderId}`);
    // Track order logic
  };

  const rateOrder = (orderId: string, rating: number) => {
    console.log(`Rating order ${orderId}: ${rating} stars`);
    // Rating logic
  };

  const cancelOrder = (orderId: string) => {
    console.log(`Cancelling order ${orderId}`);
    // Cancel order logic
  };

  const contactRider = (phone: string) => {
    console.log(`Calling rider: ${phone}`);
    // Call rider logic
  };

  const getOrderDetails = (orderId: string) => {
    return ordersData.orders.find(order => order.id === orderId);
  };

  return (
    <div className="my-orders-page">
      {/* Header */}
      <header className="orders-header">
        <div className="header-content">
          <button className="back-btn">
            <ChevronLeft size={20} />
            Back
          </button>
          <div className="title-section">
            <h1 className="page-title">
              <Package size={28} />
              {ordersData.title}
            </h1>
            <p className="page-subtitle">{ordersData.subtitle}</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <Package size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{ordersData.stats.totalOrders}</span>
                <span className="stat-label">Total Orders</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <CreditCard size={20} />
              </div>
              <div className="stat-info">
                <span className="stat-value">Rs. {ordersData.stats.totalSpent.toLocaleString()}</span>
                <span className="stat-label">Total Spent</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="orders-container">
        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-left">
            <div className="filter-group">
              <Filter size={18} />
              <span className="filter-label">Filter by Status:</span>
              <div className="status-filters">
                {ordersData.filters.map((filter, index) => (
                  <button
                    key={index}
                    className={`status-filter ${activeFilter === filter ? "active" : ""}`}
                    onClick={() => setActiveFilter(filter)}
                    style={activeFilter === filter ? { 
                      backgroundColor: getStatusColor(filter.toLowerCase().replace(' ', '_'))
                    } : {}}
                  >
                    {filter === "On The Way" ? "On Way" : filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="controls-right">
            <button className="refresh-btn">
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
        </div>

        {/* Current Orders */}
        <div className="current-orders-section">
          <h2 className="section-title">Current Orders</h2>
          <div className="current-orders-grid">
            {filteredOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').map(order => (
              <div key={order.id} className="current-order-card">
                <div className="order-header">
                  <div className="order-id">
                    <h3>{order.id}</h3>
                    <span className="order-date">{formatDate(order.date)} at {order.time}</span>
                  </div>
                  <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                    {getStatusIcon(order.status)}
                    <span>{order.statusText}</span>
                  </div>
                </div>

                <div className="order-details">
                  <div className="restaurant-info">
                    <ChefHat size={18} />
                    <div>
                      <h4>{order.restaurant}</h4>
                      <p>{order.items.length} items • Rs. {order.totalAmount}</p>
                    </div>
                  </div>

                  <div className="delivery-info">
                    <div className="info-item">
                      <MapPin size={16} />
                      <span>{order.deliveryAddress.split(',')[0]}</span>
                    </div>
                    <div className="info-item">
                      <Clock size={16} />
                      <span>Est: {order.estimatedDelivery}</span>
                    </div>
                  </div>

                  {order.riderName && (
                    <div className="rider-info">
                      <div className="rider-details">
                        <Truck size={16} />
                        <div>
                          <strong>{order.riderName}</strong>
                          <span>Your delivery partner</span>
                        </div>
                      </div>
                      {order.riderPhone && (
                        <button 
                          className="call-rider-btn"
                          onClick={() => contactRider(order.riderPhone!)}
                        >
                          <Phone size={16} />
                          Call
                        </button>
                      )}
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="order-progress">
                    <div className="progress-steps">
                      <div className={`step ${order.status === 'preparing' ? 'active' : 'completed'}`}>
                        <div className="step-icon">📝</div>
                        <span className="step-label">Ordered</span>
                      </div>
                      <div className={`step ${order.status === 'preparing' ? 'active' : order.status === 'on_the_way' ? 'active' : 'completed'}`}>
                        <div className="step-icon">👨‍🍳</div>
                        <span className="step-label">Preparing</span>
                      </div>
                      <div className={`step ${order.status === 'on_the_way' ? 'active' : ''}`}>
                        <div className="step-icon">🚚</div>
                        <span className="step-label">On Way</span>
                      </div>
                      <div className={`step ${order.status === 'delivered' ? 'completed' : ''}`}>
                        <div className="step-icon">🏠</div>
                        <span className="step-label">Delivered</span>
                      </div>
                    </div>
                  </div>

                  <div className="order-actions">
                    <button 
                      className="action-btn track-btn"
                      onClick={() => trackOrder(order.id)}
                    >
                      <Truck size={16} />
                      Track Order
                    </button>
                    <button 
                      className="action-btn cancel-btn"
                      onClick={() => cancelOrder(order.id)}
                      disabled={order.status === 'on_the_way'}
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                    <button className="action-btn chat-btn">
                      <MessageCircle size={16} />
                      Chat Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div className="order-history-section">
          <h2 className="section-title">Order History</h2>
          <div className="history-table">
            <div className="table-header">
              <div className="header-cell">Order ID</div>
              <div className="header-cell">Restaurant</div>
              <div className="header-cell">Date & Time</div>
              <div className="header-cell">Amount</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Actions</div>
            </div>

            <div className="table-body">
              {filteredOrders.filter(o => o.status === 'delivered' || o.status === 'cancelled').map(order => (
                <div key={order.id} className="table-row">
                  <div className="table-cell">
                    <strong>{order.id}</strong>
                    <div className="order-items">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <span key={idx} className="item-tag">
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                      {order.items.length > 2 && (
                        <span className="more-items">+{order.items.length - 2} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    <div className="restaurant-cell">
                      <ChefHat size={16} />
                      <span>{order.restaurant}</span>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    <div className="date-cell">
                      <span>{formatDate(order.date)}</span>
                      <span className="time">{order.time}</span>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    <div className="amount-cell">
                      <span className="amount">Rs. {order.totalAmount}</span>
                      <span className="payment-method">
                        <CreditCard size={12} />
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>
                  
                  <div className="table-cell">
                    <div 
                      className="status-cell"
                      style={{ 
                        backgroundColor: `${getStatusColor(order.status)}15`,
                        color: getStatusColor(order.status),
                        borderColor: getStatusColor(order.status)
                      }}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.statusText}</span>
                    </div>
                    {order.actualDelivery && (
                      <div className="delivery-time">
                        <Clock size={12} />
                        <span>In {order.actualDelivery}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="table-cell">
                    <div className="action-cells">
                      {order.canReorder && (
                        <button 
                          className="table-action-btn reorder-btn"
                          onClick={() => reorder(order.id)}
                        >
                          <ShoppingBag size={14} />
                          Reorder
                        </button>
                      )}
                      
                      {order.status === 'delivered' && !order.rating && (
                        <div className="rating-section">
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                className="star-btn"
                                onClick={() => rateOrder(order.id, star)}
                              >
                                <Star size={16} fill={star <= 4 ? "#fbbf24" : "none"} />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {order.rating && (
                        <div className="rated-badge">
                          <Star size={14} fill="#fbbf24" />
                          <span>{order.rating}/5</span>
                        </div>
                      )}
                      
                      <button 
                        className="table-action-btn details-btn"
                        onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                      >
                        {selectedOrder === order.id ? 'Hide' : 'View'} Details
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedOrder === order.id && (
                    <div className="expanded-details">
                      <div className="details-grid">
                        <div className="detail-column">
                          <h4>Order Items</h4>
                          <div className="items-list">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="order-item">
                                <span className="item-name">{item.quantity}x {item.name}</span>
                                <span className="item-price">Rs. {item.price * item.quantity}</span>
                              </div>
                            ))}
                            <div className="order-total">
                              <strong>Total Amount</strong>
                              <strong>Rs. {order.totalAmount}</strong>
                            </div>
                          </div>
                        </div>
                        
                        <div className="detail-column">
                          <h4>Delivery Details</h4>
                          <div className="delivery-details">
                            <div className="detail-item">
                              <MapPin size={16} />
                              <div>
                                <strong>Address</strong>
                                <p>{order.deliveryAddress}</p>
                              </div>
                            </div>
                            {order.riderName && (
                              <div className="detail-item">
                                <Truck size={16} />
                                <div>
                                  <strong>Delivery Partner</strong>
                                  <p>{order.riderName} • {order.riderPhone}</p>
                                </div>
                              </div>
                            )}
                            <div className="detail-item">
                              <Clock size={16} />
                              <div>
                                <strong>Delivery Time</strong>
                                <p>Estimated: {order.estimatedDelivery}</p>
                                {order.actualDelivery && <p>Actual: {order.actualDelivery}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="detail-column">
                          <h4>Payment Information</h4>
                          <div className="payment-details">
                            <div className="detail-item">
                              <CreditCard size={16} />
                              <div>
                                <strong>Payment Method</strong>
                                <p>{order.paymentMethod}</p>
                              </div>
                            </div>
                            <div className="detail-item">
                              <Package size={16} />
                              <div>
                                <strong>Order Status</strong>
                                <p className="status-text" style={{ color: getStatusColor(order.status) }}>
                                  {order.statusText}
                                </p>
                              </div>
                            </div>
                            {order.status === 'cancelled' && (
                              <div className="detail-item">
                                <AlertCircle size={16} />
                                <div>
                                  <strong>Cancellation Reason</strong>
                                  <p>Customer request • Refund initiated</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="empty-orders">
            <div className="empty-icon">
              <Package size={60} />
            </div>
            <h3>No orders found</h3>
            <p>You haven't placed any orders with the selected filter</p>
            <button 
              className="reset-filter-btn"
              onClick={() => setActiveFilter("All")}
            >
              Show All Orders
            </button>
          </div>
        )}

        {/* Stats Footer */}
        <div className="stats-footer">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Package size={24} />
              </div>
              <div className="stat-content">
                <h3>{ordersData.stats.currentMonthOrders}</h3>
                <p>Orders This Month</p>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <ChefHat size={24} />
              </div>
              <div className="stat-content">
                <h3>{ordersData.stats.favoriteRestaurant}</h3>
                <p>Most Ordered Restaurant</p>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <h3>28 min</h3>
                <p>Average Delivery Time</p>
              </div>
            </div>
            
            <div className="stat-item">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <h3>4.6</h3>
                <p>Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;