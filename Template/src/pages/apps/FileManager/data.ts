// images
import avatar1 from '../../../assets/images/users/avatar-1.jpg'
import avatar2 from '../../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../../assets/images/users/avatar-3.jpg'
import avatar4 from '../../../assets/images/users/avatar-4.jpg'
import avatar5 from '../../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../../assets/images/users/avatar-7.jpg'
import avatar8 from '../../../assets/images/users/avatar-8.jpg'

interface FolderFilesTypes {
  name: string;
  storage: string;
  size: string;
  files: string;
}

interface RecentFileTypes {
  name: string;
  modifiedDate: string;
  modifiedBy: string;
  size: string;
  owner: string;
  members: {
    image: string,
  }[];
}

const folderFiles: FolderFilesTypes[] = [
  {
    name: "Document",
    storage: "25%",
    size: "3 GB",
    files: "400 Files",
  },
  {
    name: "Music",
    storage: "16%",
    size: "1.5 GB",
    files: "212 Files",
  },
  {
    name: "Apps",
    storage: "50%",
    size: "39 GB",
    files: "25 Apps",
  },
  {
    name: "Videos",
    storage: "8%",
    size: "4 GB",
    files: "9 Videos",
  },
]

const recentFiles: RecentFileTypes[] = [
  {
    name: "App Design & Development",
    modifiedDate: "Jan 03, 2020",
    modifiedBy: "Andrew",
    size: "128 MB",
    owner: "Danielle Thompson",
    members: [
      {
        image: avatar1,
      },
      {
        image: avatar2,
      },
      {
        image: avatar3,
      },
      {
        image: avatar4,
      },
    ]
  },
  {
    name: "Hyper-sketch-design.zip",
    modifiedDate: "Feb 13, 2020",
    modifiedBy: "Coderthemes",
    size: "521 MB",
    owner: "Coder Themes",
    members: [
      {
        image: avatar4,
      },
      {
        image: avatar8,
      },
      {
        image: avatar6,
      },
    ],
  },
  {
    name: "Annualreport.pdf",
    modifiedDate: "Dec 18, 2019",
    modifiedBy: "Alejandro",
    size: "7.2 MB",
    owner: "Gary Coley",
    members: [
      {
        image: avatar5,
      },
      {
        image: avatar7,
      },
      {
        image: avatar4,
      },
    ],
  },
  {
    name: "Wireframes",
    modifiedDate: "Nov 25, 2019",
    modifiedBy: "Dunkle",
    size: "54.2 MB",
    owner: "Jasper Rigg",
    members: [
      {
        image: avatar6,
      },
      {
        image: avatar4,
      },
      {
        image: avatar7,
      },
      {
        image: avatar5,
      },
    ],
  },
  {
    name: "Documentation.docs",
    modifiedDate: "Feb 9, 2020",
    modifiedBy: "Justin",
    size: "8.3 MB",
    owner: "Cooper Sharwood",
    members: [
      {
        image: avatar5,
      },
      {
        image: avatar8,
      },
    ],
  },
]

export { folderFiles, recentFiles };