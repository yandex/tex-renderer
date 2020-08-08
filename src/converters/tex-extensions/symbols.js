/* eslint-disable no-undef */
MathJax.Hub.Register.StartupHook('TeX Jax Ready', function() {
    MathJax.InputJax.TeX.Definitions.Add({
        macros: {
            tg: ['Macro', 'tg'],
            ctg: ['Macro', 'ctg'],
            arctg: ['Macro', 'arctg'],
            degree: ['Macro', '°'],
        },
    });
});

MathJax.Ajax.loadComplete('[Ext]/symbols.js');
