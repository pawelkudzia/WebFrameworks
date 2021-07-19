import matplotlib.pyplot as plt
import numpy as np

# data
dotnet_requests = [86969, 282159, 292688, 295841, 299524, 267553]
express_requests = [56132, 141999, 143794, 143490, 139665, 141147]
laravel_requests = [11966, 38655, 38884, 38437, 39129, 39956]

# plot
bar_width = 0.25
labels = ['1', '16', '32', '64', '128', '256']
legend = ['.NET', 'Express', 'Laravel']
xlabel = 'Liczba klientów'
ylabel = 'Liczba żądań'
title = 'JSON Test'
x = np.arange(len(labels))

plt.style.use('seaborn')
plt.figure(figsize=(8, 6))

plt.bar(x - bar_width, dotnet_requests, bar_width)
plt.bar(x, express_requests, bar_width)
plt.bar(x + bar_width, laravel_requests, bar_width)

plt.xticks(x, labels)
plt.xlabel(xlabel)
plt.ylabel(ylabel)
plt.title(title)
plt.legend(legend)
plt.show()
