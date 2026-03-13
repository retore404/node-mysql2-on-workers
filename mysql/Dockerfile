FROM mysql:8.4

EXPOSE 3306
# Copy conf file to the container
COPY ./my.cnf /etc/mysql/my.cnf
# Set permissions for the configuration file
RUN chmod 644 /etc/mysql/my.cnf
# Copy SQL initialization scripts to the container
COPY ./sql_init /docker-entrypoint-initdb.d