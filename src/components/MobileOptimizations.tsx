// Mobile-specific optimizations and utility classes
// This file contains additional mobile styles and utilities

export const mobileStyles = `
  /* Mobile-first responsive design improvements */
  
  /* Touch target improvements */
  .touch-target {
    min-height: 44px;
    min-width: 44px;
    padding: 8px;
  }
  
  /* Mobile-friendly spacing */
  .mobile-spacing {
    padding: 16px;
  }
  
  .mobile-spacing-sm {
    padding: 8px;
  }
  
  /* Responsive text sizes */
  .text-responsive {
    font-size: 14px;
  }
  
  @media (min-width: 640px) {
    .text-responsive {
      font-size: 16px;
    }
  }
  
  @media (min-width: 1024px) {
    .text-responsive {
      font-size: 18px;
    }
  }
  
  /* Mobile-optimized cards */
  .mobile-card {
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  
  @media (min-width: 640px) {
    .mobile-card {
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 16px;
    }
  }
  
  @media (min-width: 1024px) {
    .mobile-card {
      padding: 24px;
      border-radius: 16px;
      margin-bottom: 24px;
    }
  }
  
  /* Mobile navigation improvements */
  .mobile-nav-item {
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 8px;
    margin-bottom: 4px;
  }
  
  @media (min-width: 640px) {
    .mobile-nav-item {
      padding: 16px 20px;
      font-size: 16px;
      border-radius: 12px;
      margin-bottom: 8px;
    }
  }
  
  /* Mobile-friendly forms */
  .mobile-form-input {
    padding: 12px;
    font-size: 16px; /* Prevents zoom on iOS */
    border-radius: 8px;
  }
  
  .mobile-form-button {
    padding: 12px 24px;
    font-size: 16px;
    border-radius: 8px;
    min-height: 44px;
  }
  
  /* Mobile grid improvements */
  .mobile-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  @media (min-width: 640px) {
    .mobile-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }
  
  @media (min-width: 1024px) {
    .mobile-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
  }
  
  @media (min-width: 1280px) {
    .mobile-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }
  }
  
  /* Mobile table improvements */
  .mobile-table {
    display: block;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .mobile-table-row {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  @media (min-width: 768px) {
    .mobile-table-row {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
  
  /* Mobile-friendly animations */
  .mobile-fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: mobileFadeIn 0.3s ease-out forwards;
  }
  
  @keyframes mobileFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Mobile-specific scroll improvements */
  .mobile-scroll {
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }
  
  /* Mobile-friendly modal/overlay */
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  
  .mobile-modal {
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 90vw;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  /* Mobile-optimized charts */
  .mobile-chart {
    height: 200px;
  }
  
  @media (min-width: 640px) {
    .mobile-chart {
      height: 250px;
    }
  }
  
  @media (min-width: 1024px) {
    .mobile-chart {
      height: 300px;
    }
  }
  
  /* Mobile-specific utilities */
  .hide-on-mobile {
    display: none;
  }
  
  @media (min-width: 640px) {
    .hide-on-mobile {
      display: block;
    }
  }
  
  .show-on-mobile {
    display: block;
  }
  
  @media (min-width: 640px) {
    .show-on-mobile {
      display: none;
    }
  }
  
  /* Mobile-friendly loading states */
  .mobile-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }
  
  .mobile-loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const MobileOptimizations = () => {
  return (
    <style jsx global>{mobileStyles}</style>
  );
};