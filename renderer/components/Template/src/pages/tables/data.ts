interface TableRecord {
  id: number;
  name: string;
  age: number;
  address: string;
  title?: string,
  email?: string,
  isBG?: boolean;
}

interface DataTableRecord {
  id: number;
  name: string;
  email: string;
  position: string;
  company: string;
  country: string;
  date?: string;
  total?: string;
  status?: string;
}

const records: TableRecord[] = [
  {
    id: 1,
    name: "John Brown",
    age: 45,
    address: "New York No. 1 Lake Park",
    title: "Regional Paradigm Technician",
    email: "john@site.com",
  },
  {
    id: 2,
    name: "Jim Green",
    age: 27,
    address: "London No. 1 Lake Park",
    title: "Forward Response Developer",
    email: "jim@site.com",
  },
  {
    id: 3,
    name: "Joe Black",
    age: 31,
    address: "Sidney No. 1 Lake Park",
    title: "Product Directives Officer",
    email: "joe@site.com",
  },
  {
    id: 4,
    name: "Edward King",
    age: 16,
    address: "LA No. 1 Lake Park",
  },
  {
    id: 5,
    name: "Jim Red",
    age: 45,
    address: "Melbourne No. 1 Lake Park",
  },
]

const dataTableRecords: DataTableRecord[] = [
  {
    id: 1,
    name: "Jonathan",
    email: "jonathan@example.com",
    position: "Senior Implementation Architect",
    company: "Hauck Inc",
    country: "Holy See",
  },
  {
    id: 2,
    name: "Harold",
    email: "harold@example.com",
    position: "Forward Creative Coordinator",
    company: "Metz Inc",
    country: "Iran",
  },
  {
    id: 3,
    name: "Shannon",
    email: "shannon@example.com",
    position: "Legacy Functionality Associate",
    company: "Zemlak Group",
    country: "South Georgia",
  },
  {
    id: 4,
    name: "Robert",
    email: "robert@example.com",
    position: "Product Accounts Technician",
    company: "Hoeger",
    country: "San Marino",
  },
  {
    id: 5,
    name: "Noel",
    email: "noel@example.com",
    position: "Customer Data Director",
    company: "Howell - Rippin",
    country: "Germany",
  },
  {
    id: 6,
    name: "Traci",
    email: "traci@example.com",
    position: "Corporate Identity Director",
    company: "Koelpin - Goldner",
    country: "Vanuatu",
  },
  {
    id: 7,
    name: "Kerry",
    email: "kerry@example.com",
    position: "Lead Applications Associate",
    company: "Feeney, Langworth and Tremblay",
    country: "Niger",
  },
  {
    id: 8,
    name: "Patsy",
    email: "patsy@example.com",
    position: "Dynamic Assurance Director",
    company: "Streich Group",
    country: "Niue",
  },
  {
    id: 9,
    name: "Cathy",
    email: "cathy@example.com",
    position: "Customer Data Director",
    company: "Ebert, Schamberger and Johnston",
    country: "Mexico",
  },
  {
    id: 10,
    name: "Tyrone",
    email: "tyrone@example.com",
    position: "Senior Response Liaison",
    company: "Raynor, Rolfson and Daugherty",
    country: "Qatar",
  },
  {
    id: 11,
    name: "Jonathan",
    email: "jonathan@example.com",
    position: "Senior Implementation Architect",
    company: "Hauck Inc",
    country: "Holy See",
  },
  {
    id: 12,
    name: "Harold",
    email: "harold@example.com",
    position: "Forward Creative Coordinator",
    company: "Metz Inc",
    country: "Iran",
  },
  {
    id: 13,
    name: "Shannon",
    email: "shannon@example.com",
    position: "Legacy Functionality Associate",
    company: "Zemlak Group",
    country: "South Georgia",
  },
  {
    id: 14,
    name: "Robert",
    email: "robert@example.com",
    position: "Product Accounts Technician",
    company: "Hoeger",
    country: "San Marino",
  },
  {
    id: 15,
    name: "Noel",
    email: "noel@example.com",
    position: "Customer Data Director",
    company: "Howell - Rippin",
    country: "Germany",
  },
]
export { records, dataTableRecords };