SELECT COUNT(id) AS "pm10 rows"
FROM measurements
WHERE parameter LIKE "%pm10%";