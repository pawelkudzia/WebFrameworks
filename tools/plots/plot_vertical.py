import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
import sys


class VerticalPlot:
    def __init__(self, csv_file_path, file_name, title, style='seaborn'):
        # input data
        self.df = pd.read_csv(csv_file_path)
        self.df = self.df.rename(
            index={0: 'requests'})
        self.requests_data = self.df.loc['requests']

        # plot settings
        plt.style.use(style)
        self.bar_width = 0.6
        self.labels = ['.NET', 'Express', 'Laravel']
        self.legend = ['Czas']
        self.xlabel = 'Platforma programistyczna'
        self.ylabel = 'Czas [s]'
        self.title = title
        self.x = np.arange(len(self.labels))
        self.fig_width = 8
        self.fig_height = 6
        self.fig, self.ax = plt.subplots(
            figsize=(self.fig_width, self.fig_height))

        # output file settings
        self.file_name = file_name

    def generate(self):
        self.ax.bar(self.x, self.requests_data, self.bar_width)

        for container in self.ax.containers:
            self.ax.bar_label(container, padding=2)

        self.ax.set_xlabel(self.xlabel)
        self.ax.set_ylabel(self.ylabel)
        self.ax.set_xticks(self.x)
        self.ax.set_xticklabels(self.labels)
        self.ax.set_title(self.title, fontsize=14, fontweight='bold')
        plt.legend(self.legend)
        plt.tight_layout()
        plt.savefig(self.file_name)


csv_dir = 'csv'
plots_dir = 'plots'
plot_data = {
    'measurements_random_create_1000': 'Czasy testu Measurements Random Create 1000',
    'measurements_random_create_10000': 'Czasy testu Measurements Random Create 10000',
    'measurements_random_update_1000': 'Czasy testu Measurements Random Update 1000',
    'measurements_random_update_10000': 'Czasy testu Measurements Random Update 10000'
}

if not os.path.isdir(csv_dir):
    sys.exit(f'{csv_dir} directory does not exist')

if not os.path.isdir(plots_dir):
    os.makedirs(plots_dir)
    print(f'{plots_dir} directory was created\n')

for key, value in plot_data.items():
    horizontal_plot = VerticalPlot(
        csv_file_path=f'{csv_dir}/{key}.csv', file_name=f'{plots_dir}/{key}.png', title=value)
    horizontal_plot.generate()
    print(f'{key} was created')
