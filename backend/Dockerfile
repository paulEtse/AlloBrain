
FROM python:3.9


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt
COPY ./requirements_dev.txt /code/requirements_dev.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt -r /code/requirements_dev.txt


COPY ./ /code/app

EXPOSE 8005

CMD ["uvicorn", "app.src.main:app", "--port", "8005", "--host", "0.0.0.0"]