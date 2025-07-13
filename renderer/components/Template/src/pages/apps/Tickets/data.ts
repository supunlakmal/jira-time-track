// images
import avatar2 from '../../../assets/images/users/avatar-2.jpg'
import avatar3 from '../../../assets/images/users/avatar-3.jpg'
import avatar4 from '../../../assets/images/users/avatar-4.jpg'
import avatar5 from '../../../assets/images/users/avatar-5.jpg'
import avatar6 from '../../../assets/images/users/avatar-6.jpg'
import avatar7 from '../../../assets/images/users/avatar-7.jpg'
import avatar8 from '../../../assets/images/users/avatar-8.jpg'
import avatar9 from '../../../assets/images/users/avatar-9.jpg'

export interface TicketDetailsItems {
  id: string;
  requested_by: {
    name: string;
    image: string;
  };
  subject: string;
  assignee: string;
  priority: string;
  status: string;
  created_date: string;
  due_date: string;
}

export interface TicketStatistic {
  count: number;
  icon: string;
  variant: string;
  status: string;
}

const ticketDetails: TicketDetailsItems[] = [
  {
    id: "#1020",
    requested_by: {
      name: "Lindsay Walton",
      image: avatar9,
    },
    subject: "A new rating has been received",
    assignee: avatar9,
    priority: "Medium",
    status: "Closed",
    created_date: "13/08/2011",
    due_date: "30/08/2013",
  },
  {
    id: "#1254",
    requested_by: {
      name: "Jhon Maryo",
      image: avatar2,
    },
    subject: "Your application has been received!",
    assignee: avatar2,
    priority: "High",
    status: "Closed",
    created_date: "01/04/2017",
    due_date: "21/05/2017",
  },
  {
    id: "#1256",
    requested_by: {
      name: "Jerry Geiger",
      image: avatar3,
    },
    subject: "Support for theme",
    assignee: avatar3,
    priority: "Low",
    status: "Open",
    created_date: "28/07/2020",
    due_date: "28/07/2020",
  },
  {
    id: "#1352",
    requested_by: {
      name: "Adam Thomas",
      image: avatar4,
    },
    subject: "Question regarding your Tailwind Theme",
    assignee: avatar4,
    priority: "High",
    status: "Open",
    created_date: "01/04/2017",
    due_date: "21/05/2017",
  },
  {
    id: "#2251",
    requested_by: {
      name: "Sara Lewis",
      image: avatar5,
    },
    subject: "Verify your new email address!",
    assignee: avatar5,
    priority: "High",
    status: "Open",
    created_date: "20/04/2008",
    due_date: "20/04/2008",
  },
  {
    id: "#2542",
    requested_by: {
      name: "Myrtle Johnson",
      image: avatar6,
    },
    subject: "New submission on your website",
    assignee: avatar6,
    priority: "Medium",
    status: "Closed",
    created_date: "20/04/2017",
    due_date: "25/04/2017",
  },
  {
    id: "#3020",
    requested_by: {
      name: "Bryan Collier",
      image: avatar7,
    },
    subject: "Verify your new email address!",
    assignee: avatar7,
    priority: "High",
    status: "Open",
    created_date: "02/06/2018",
    due_date: "21/06/2018",
  },
  {
    id: "#3562",
    requested_by: {
      name: "Joshua Moody",
      image: avatar8,
    },
    subject: "Security alert for my account",
    assignee: avatar8,
    priority: "Low",
    status: "Open",
    created_date: "28/07/2020",
    due_date: "03/08/2020",
  },
  {
    id: "#3652",
    requested_by: {
      name: "John Clune",
      image: avatar9,
    },
    subject: "Item Support Message sent",
    assignee: avatar9,
    priority: "Medium",
    status: "Closed",
    created_date: "26/10/2021",
    due_date: "26/10/2021",
  },
]

const ticketStatistics: TicketStatistic[] = [
  {
    count: 3947,
    icon: "mgc_tag_line",
    status: "Total",
    variant: "bg-primary/25 text-primary",
  },
  {
    count: 624,
    icon: "mgc_alarm_2_line",
    status: "Pending",
    variant: "bg-yellow-100 text-yellow-500",
  },
  {
    count: 3195,
    icon: "mgc_check_line",
    status: "Closed",
    variant: "bg-green-100 text-green-500",
  },
  {
    count: 128,
    icon: "mgc_delete_line",
    status: "Deleted",
    variant: "bg-red-100 text-red-500",
  },
]

export { ticketDetails, ticketStatistics };