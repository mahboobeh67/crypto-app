
const convertData = (data, type) => {
  // جلوگیری از خطا اگر هنوز داده از API نیومده
  if (!data || !data[type]) {
    console.warn(`⚠️ convertData: data[${type}] خالی یا نامعتبر است`, data);
    return [];
  }

  const convertedData = data[type].map((item) => ({
    date: item[0],
    [type]: item[1],
  }));

  return convertedData;
};

export default convertData;
