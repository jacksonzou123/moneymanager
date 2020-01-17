# Spendie

**Spendie** by JaJeJu

## Roster

* Jackson Zou
  * Project Manager
  * Back-end
    * Flask Routes
    * Database Actions
* Jeff Lin
  * Front-end
    * Templates
    * CSS Styling
* Jun Tao Lei
  * Front-end
    * Javascript Functionalities
  * Back-end
    * Setup Database
    * Setup Authentication

## What is Spendie

Spendie is a budget/money management web application designed to track your spending and to help visualize it in a intuitive way.
It has the following features that will help you organize your finances:
- transactions
- requests
- todos
- calender
- tag search

## [VIDEO](https://youtu.be/9HhC08uPWtE)

## API

* [Google Maps Embed API](https://docs.google.com/document/d/1BrK8KIi1jxdETaGoEcuEB_UDiGwZhFFeWxZ_dlwiFww/edit)
  * It shows a map of the location for each transaction if you put one in
* [Google Sheets API](https://docs.google.com/document/d/1RXjh3HHWOUhgDGow2KGhM7Rb3jkI-uMS50rpPrDEkUE/edit)
  * Allows you to export your transactions to google sheets

## Run Instruction

1. Procure any necessary API keys and secrets. Follow the directions from the API card links above.
2. Clone the repository with Git.

   ```bash
   git clone https://github.com/jacksonzou123/moneymanager.git
   ```

3. Change into the project directory.

   ```bash
   cd moneymanager/
   ```

4. Create a Python virtual environment in Python3. Visit <https://www.python.org/> for instructions on installing and setting up python3, pip3, and venv on your target operating system.

   ```bash
   python3 -m venv venv
   . venv/bin/activate
   ```

5. Install the required third party packages.

   ```bash
   pip3 install -r doc/requirements.txt
   ```

6. Export any required environment variables

   ```bash
   export GOOGLE_MAPS_EMBED_API_KEY='your_super_secret_api_key'
   export GOOGLE_SHEETS_CLIENT_ID='your_super_secret_client_id'
   export GOOGLE_SHEETS_API_KEY='your_super_secret_api_key'
   ```

7. Run the Flask app.

   ```bash
   python3 app.py
   ```
