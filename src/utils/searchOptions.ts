const searchOption = (keyword: string) => {
  const options: Array<{ [key: string]: { $regex: string } }> = [
    { title: { $regex: `${keyword}` } },
    { content: { $regex: `${keyword}` } },
  ];

  return options;
};

export { searchOption };
