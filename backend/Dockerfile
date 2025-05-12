# Step 1: Use a lightweight Python image
FROM python:3.10-slim

# Step 2: Set working directory in the container
WORKDIR /app

# Step 3: Copy app files to the container
COPY requirements.txt .

# Step 4: Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Step 5: Expose port (Flask default is 5000)
EXPOSE 5000

# Step 6: Define the command to run your app with gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "api.routes:app"]
