SELECT *
FROM measurements
WHERE parameter LIKE "%pm10%"
ORDER BY timestamp DESC;
