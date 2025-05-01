# E-commerce Application Deployment with Ansible

## Execution Order Explanation

The playbook is designed to execute roles in a specific order to ensure dependencies are met before deploying containers:

1. **Common Role**: This role runs first to ensure system packages are up-to-date and all required dependencies are installed. This is a prerequisite for any other configuration.

2. **Docker Role**: After system preparation, we install and configure Docker. This role installs Docker, sets up permissions, and creates a custom Docker network for our containers to communicate.

3. **Application Role**: Finally, we deploy the application components. This includes:
   - Cloning the repository
   - Setting up MongoDB container
   - Building and running the backend API container
   - Building and running the frontend container

The sequential order is critical because each role depends on the successful completion of the previous one.

## Role Functions

### Common Role
- **Function**: Prepares the system by updating package cache and installing required system dependencies.
- **Position**: First in playbook, as it sets up prerequisites needed by other roles.
- **Modules Used**:
  - `apt`: Used for package management operations like updating cache and installing packages.

### Docker Role
- **Function**: Installs and configures Docker engine, sets proper permissions, and creates a network for container communication.
- **Position**: Second in playbook, after system preparation but before application deployment.
- **Modules Used**:
  - `apt_key`: Adds Docker's GPG key for package verification.
  - `apt_repository`: Adds Docker's repository to apt sources.
  - `apt`: Installs Docker packages.
  - `pip`: Installs Docker Python module for Ansible to interact with Docker.
  - `user`: Adds the user to the Docker group for permissions.
  - `docker_network`: Creates a custom Docker network for container communication.

### Application Role
- **Function**: Deploys the e-commerce application components (MongoDB, backend API, frontend) as Docker containers.
- **Position**: Last in playbook, after all prerequisites are in place.
- **Modules Used**:
  - `file`: Creates necessary directories.
  - `git`: Clones the application repository.
  - `copy`: Creates Dockerfiles for frontend and backend components.
  - `docker_image`: Builds Docker images from Dockerfiles.
  - `docker_container`: Runs containers with proper configuration, networking, and port mapping.
  - `uri`: Verifies API is running correctly (in post-tasks).

## Ansible Modules Applied

- **File Management**:
  - `file`: Creates directories with proper permissions.
  - `copy`: Creates configuration files and Dockerfiles.

- **Package Management**:
  - `apt`: Manages system packages.
  - `apt_key`: Adds GPG keys for repositories.
  - `apt_repository`: Manages APT repositories.
  - `pip`: Installs Python packages.

- **Source Control**:
  - `git`: Clones the application repository.

- **Docker Integration**:
  - `docker_network`: Manages Docker networks.
  - `docker_image`: Builds and manages Docker images.
  - `docker_container`: Creates and manages Docker containers.

- **User Management**:
  - `user`: Manages user accounts and group memberships.

- **Testing**:
  - `uri`: Tests HTTP endpoints for availability.
  - `debug`: Outputs useful information during playbook execution.

The flow between these roles ensures a smooth deployment process with proper dependency management and container orchestration.
