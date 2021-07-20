import matplotlib.pyplot as plt
import numpy as np
import pandas as pd


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


horizontal_plot = HorizontalPlot(
    'json.csv', 'json', 'Liczba żądań dla testu JSON')
horizontal_plot.generate()
