# Project Title

> image estimator Backend
---------------------------
## Introduction

> The image estimator backend server will provide the api to the frontend to get image cutouts.
---------------------------
### Dependencies

> The image estimator backend relies on several key technologies and libraries to ensure optimal performance and functionality. Here are the core dependencies:

- Python:
``` 
 visit (https://www.python.org/downloads/) and install latest version of python 3.11

 ```

- Django
- Django Rest Framework
- Django Rest Framework Simple JWT
- Django Cors Headers

To install these dependencies, use the package manager pip with the provided requirements.txt file:

```
pip install -r requirements.txt

```
-------------------

### Installation 

- Clone the repo or download zip file

```
git clone https://github.com/eSpark-Consultants/andrew-imageestimator
cd backend
```

- Install dependencies:

```
pip install -r requirements.txt

```

- Apply database migrations:

```
cd imgestimator
python manage.py migrate

```

- Run the development server:

```
python manage.py runserver

```

> The backend should now be accessible at http://localhost:8000/.

### Configuration

> Ensure that you configure the necessary settings in the settings.py file, including database configurations, security settings, and any other environment-specific variables

### Usage

> The backend provides API endpoint for image processing. 

### Note

>First, you need to build the OpenCV module with CUDA support and then link it with the virtual environment configured for this project. Follow these steps to build OpenCV with CUDA support.
```
https://medium.com/@juancrrn/installing-opencv-4-with-cuda-in-ubuntu-20-04-fde6d6a0a367

```

> If you have built OpenCV with CUDA, it is recommended to manually install all the required modules and libraries instead of using the requirements.txt file. This is because there might be version errors for some libraries. To avoid any issues, it is better to install all the libraries and modules manually according to the Python version for which you have built OpenCV with GPU access.