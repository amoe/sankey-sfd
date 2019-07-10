# sankey-sfd

A sankey diagram that is used to display a two-column layout illustrating the
correlation between two outputs from the [Surprising Phrase
Detector](https://github.com/andehr/sfpd).

For information on the algorithm, see the paper "Characterising Semantically
Coherent Categories of Text Using Feature Discovery" (2018).

The graph must be created from two excel files.  Two are provided in the
`sample-excel` directory.  Use the Python script
`format_sankey_sfd_graph_from_excel.py` to produce the graph.  The node-links
format that's used by the `d3-sankey` Node is produced by this script.

The `energy.json` file is a standard example based on Bostock's Observable
notebook, which this code is modelled on.
