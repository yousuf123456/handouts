export const catalogSortOptions = [
  {
    label: "Best Match",
    searchParam: "",
    remove: true,
  },

  {
    label: "Price: Low To High",
    searchParam: "",
    remove: false,
  },

  {
    label: "Price: High To Low",
    searchParam: "",
    remove: false,
  },
];

export const filterOptions = [
  {
    label: "All Stars",
    searchParam: "filter=1",
    remove: true,
  },

  {
    label: "5 Star",
    searchParam: "filter=5",
    remove: false,
  },

  {
    label: "4 Star",
    searchParam: "filter=4",
    remove: false,
  },

  {
    label: "3 Star",
    searchParam: "filter=3",
    remove: false,
  },

  {
    label: "2 Star",
    searchParam: "filter=2",
    remove: false,
  },

  {
    label: "1 Star",
    searchParam: "filter=1",
    remove: false,
  },
];

export const sortOptions = [
  {
    label: "Recent",
    searchParam: `sortBy=rating`,
    remove: true,
  },
  {
    label: "Rating: High To Low",
    searchParam: `sortBy=rating&direction=desc`,
    remove: false,
  },
  {
    label: "Rating: Low To High",
    searchParam: `sortBy=rating&direction=asc`,
    remove: false,
  },
];

export const provinces = [
  "Azad Kashmir",
  "Balochistān",
  "Gilgit-Baltistan",
  "Islamabad",
  "Khyber Pakhtunkhwa",
  "Punjab",
  "Sindh",
];

export const areas = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Hunza",
  "Quetta",
  "Peshawar",
];
