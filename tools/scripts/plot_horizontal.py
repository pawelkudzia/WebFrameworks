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
xlabel = 'Liczba żądań'
ylabel = 'Liczba klientów'
title = 'JSON Test'
y = np.arange(len(labels))

plt.style.use('seaborn')
fig, ax = plt.subplots(figsize=(8, 6))

dotnet_bar = ax.barh(y - bar_width, dotnet_requests, bar_width)
express_bar = ax.barh(y, express_requests, bar_width)
laravel_bar = ax.barh(y + bar_width, laravel_requests, bar_width)

ax.set_yticks(y)
ax.set_yticklabels(labels)
ax.invert_yaxis()

for container in ax.containers:
    ax.bar_label(container)

ax.set_xlabel(xlabel)
ax.set_ylabel(ylabel)
ax.set_title(title)
ax.set_xmargin(0.1)
plt.legend(legend)
plt.tight_layout()
plt.show()
