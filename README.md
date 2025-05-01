# Ansible Configuration for E-commerce Application

This project automates the deployment of a containerized e-commerce application using Ansible. The application consists of a MongoDB database, Node.js backend API, and a frontend web interface, all deployed as Docker containers.

## Requirements

- Vagrant 2.x
- VirtualBox 7.x
- Git
- Internet connection for downloading packages and Docker images

## Project Structure
.
├── ansible.cfg            # Ansible configuration
├── explanation.md         # Detailed explanation of roles and execution flow
├── group_vars
│   └── all.yml            # Variables used throughout the playbook
├── inventory              # Inventory file for Ansible
├── playbook.yml           # Main playbook file
├── README.md              # This file
├── roles
│   ├── application        # Role for deploying the application
│   │   └── tasks
│   │       └── main.yml
│   ├── common             # Role for system setup
│   │   └── tasks
│   │       └── main.yml
│   └── docker             # Role for Docker installation
│       └── tasks
│           └── main.yml
└── Vagrantfile            # Vagrant configuration

## Getting Started

1. Clone this repository:
 https://github.com/kimberlynangira/gallery.git

2. Start the Vagrant virtual machine:  
vagrant up

This will:
- Provision an Ubuntu 20.04 VM
- Install Ansible
- Run the playbook automatically

3. Access the application:
- Frontend: http://192.168.33.10:80 or http://localhost:8080
- Backend API: http://192.168.33.10:5000 or http://localhost:5000

## Manual Playbook Execution

If you need to run the playbook manually:
vagrant ssh
cd /vagrant
ansible-playbook playbook.yml
## Testing

After deployment, you can verify the application is working by:

1. Opening the frontend in a web browser
2. Adding a product through the provided form
3. Verifying the product appears in the list

## Containerization

The application uses three Docker containers:
- MongoDB: Database storage with persistent volume
- Backend API: Node.js application connecting to MongoDB
- Frontend: Web interface for users

All containers run on a custom Docker network for secure communication.

## Additional Information

For detailed information about the implementation, roles, and execution order, please refer to the [explanation.md](explanation.md) file.
