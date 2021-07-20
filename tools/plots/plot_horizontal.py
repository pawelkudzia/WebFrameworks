import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import os
import sys


class HorizontalPlot:
    def __init__(self, csv_file_path, file_name, title, style='seaborn'):
        # input data
        self.df = pd.read_csv(csv_file_path)
        self.df = self.df.rename(
            index={0: 'dotnet', 1: 'express', 2: 'laravel'})
        self.dotnet_data = self.df.loc['dotnet']
        self.express_data = self.df.loc['express']
        self.laravel_data = self.df.loc['laravel']

        # plot settings
        plt.style.use(style)
        self.bar_width = 0.25
        self.labels = ['1', '16', '32', '64', '128', '256']
        self.legend = ['.NET', 'Express', 'Laravel']
        self.xlabel = 'Liczba żądań'
        self.ylabel = 'Liczba klientów'
        self.title = title
        self.y = np.arange(len(self.labels))
        self.xmargin = 0.1
        self.fig_width = 8
        self.fig_height = 6
        self.fig, self.ax = plt.subplots(
            figsize=(self.fig_width, self.fig_height))

        # output file settings
        self.file_name = file_name

    def generate(self):
        self.ax.barh(self.y - self.bar_width,
                     self.dotnet_data, self.bar_width)
        self.ax.barh(self.y, self.express_data, self.bar_width)
        self.ax.barh(self.y + self.bar_width,
                     self.laravel_data, self.bar_width)

        self.ax.set_yticks(self.y)
        self.ax.set_yticklabels(self.labels)
        self.ax.invert_yaxis()

        for container in self.ax.containers:
            self.ax.bar_label(container)

        self.ax.set_xlabel(self.xlabel)
        self.ax.set_ylabel(self.ylabel)
        self.ax.set_title(self.title, fontsize=14, fontweight='bold')
        self.ax.set_xmargin(self.xmargin)
        plt.legend(self.legend)
        plt.tight_layout()
        plt.savefig(self.file_name)


csv_dir = 'csv'
plots_dir = 'plots'
plot_data = {
    'json': 'Liczba żądań dla testu JSON',
    'plaintext': 'Liczba żądań dla testu Plaintext',
    'base64': 'Liczba żądań dla testu Base64',
    'measurements_random': 'Liczba żądań dla testu Measurements Random',
    'measurements': 'Liczba żądań dla testu Measurements',
    'measurements100': 'Liczba żądań dla testu Measurements 100',
    'measurements1000': 'Liczba żądań dla testu Measurements 1000',
    'measurements_location': 'Liczba żądań dla testu Measurements Location',
    'measurements_queries5': 'Liczba żądań dla testu Measurements Queries 5',
    'measurements_queries10': 'Liczba żądań dla testu Measurements Queries 10',
}

if not os.path.isdir(csv_dir):
    sys.exit(f'{csv_dir} directory does not exist')

if not os.path.isdir(plots_dir):
    os.makedirs(plots_dir)
    print(f'{plots_dir} directory was created\n')

for key, value in plot_data.items():
    horizontal_plot = HorizontalPlot(
        csv_file_path=f'{csv_dir}/{key}.csv', file_name=f'{plots_dir}/{key}.png', title=value)
    horizontal_plot.generate()
    print(f'{key} was created')
