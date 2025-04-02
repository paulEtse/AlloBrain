
FROM python:3.9

WORKDIR /app
COPY ./ /.
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt -r ./requirements_dev.txt

EXPOSE 7000

CMD ["uvicorn", "src.main:app", "--port", "7000", "--host", "0.0.0.0"]