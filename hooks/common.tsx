import React from 'react';

const useCommon = () => {
  const formatDate = (dateString: any) => {
    if (!dateString || dateString === ' ' || dateString === null) {
      return '--';
    }
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    } catch (error) {
      return '--';
    }
  };
  return {
    formatDate,
  };
};

export default useCommon;
