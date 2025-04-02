
FROM python:3.9

WORKDIR /app
COPY ./ /app
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt -r /app/requirements_dev.txt

EXPOSE 6173

CMD ["uvicorn", "src.main:app", "--port", "6173", "--host", "0.0.0.0"]