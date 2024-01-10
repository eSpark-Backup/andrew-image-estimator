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