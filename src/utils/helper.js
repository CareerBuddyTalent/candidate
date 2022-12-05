export const sleep = async (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
export const checkStatus = (staus) => {
  return staus === true;
};

export const errorMessage = (error) => {
  if (error.response) {
    return error.response.data.message;
  }
  if (error.request) {
    return error.request.message;
  }
  return error.message;
};

export const badgeColor = (status) => {
  // if (!['Pending','Reviewed','Interview','Hired','Rejected'].includes(status)) throw error('...')
  return (
    {
      pending: 'bg-[#F6D44D1A] text-[#F6D44D]',
      reviewed: 'bg-[#18D8B61A] text-[#18D8B6]',
      interview: 'bg-[#1EAEFF1A] text-[#1EAEFF]',
      hired: 'bg-[#1EB12D1A] text-[#1EB12D]',
      rejected: 'bg-[#FE06331A] text-[#FE0633]',
    }[status.toLowerCase()] || 'bg-brand-primary text-white'
  );
};
