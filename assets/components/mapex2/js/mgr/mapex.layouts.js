/*
 Источник: http://drupal.org/project/yamaps, автор: Васильчук Николай, anonym.tsk@gmail.com
 Портация на MODX: Наумов Алексей (http://www.createit.ru)
 */
Ext.onReady(function(){
    ymaps.ready(function() {
        // Available colors
        Mapex.colors = {
            lightblue: '#66c7ff',
            blue: '#006cff',
            darkblue: '#00339a',
            night: '#004056',
            green: '#33cc00',
            darkgreen: '#1bad03',
            grey: '#d1d1d1',
            black: '#000000',
            brown: '#793e0f',
            red: '#ff0000',
            orange: '#ffb400',
            darkorange: '#ff6600',
            yellow: '#ffea00',
            //olive: '#c1c766',
            violet: '#b832fd',
            pink: '#fd32fb'
        };
        // HTML for colorpicker
        Mapex.colorsHTML = '';
        for (var i in Mapex.colors) {
            Mapex.colorsHTML += '<div class="mapex-color"><div data-content="' + i + '">' + Mapex.colors[i] + '</div></div>';
        }

        // Opacity select layout
        Mapex.addLayout('mapex#OpacityLayout', ymaps.templateLayoutFactory.createClass([
            '<label for="opacity">Прозрачность</label>',
            '<select id="opacity">',
            '<option value="1">100%</option>',
            '<option value="0.9">90%</option>',
            '<option value="0.8">80%</option>',
            '<option value="0.7">70%</option>',
            '<option value="0.6">60%</option>',
            '<option value="0.5">50%</option>',
            '<option value="0.4">40%</option>',
            '<option value="0.3">30%</option>',
            '<option value="0.2">20%</option>',
            '<option value="0.1">10%</option>',
            '</select>'
        ].join('')));

        // Stroke width layout
        Mapex.addLayout('mapex#StrokeWidthLayout', ymaps.templateLayoutFactory.createClass([
            '<label for="strokeWidth">Ширина линии</label>',
            '<select id="strokeWidth">',
            '<option value="7">Очень толстая</option>',
            '<option value="5">Толстая</option>',
            '<option value="3">Нормальная</option>',
            '<option value="2">Тонкая</option>',
            '<option value="1">Очень тонкая</option>',
            '</select>'
        ].join('')));

        // ColorPicker layout
        Mapex.addLayout('mapex#ColorPicker', ymaps.templateLayoutFactory.createClass(
            '<div class="mapex-colors">' + Mapex.colorsHTML + '</div>',
            {
                build: function () {
                    this.constructor.superclass.build.call(this);
                    // TODO XXX
                    this.$elements = jQuery(this.getParentElement()).find('.mapex-color');
                    this.$elements.each(function() {
                        var $div = jQuery(this).children('div');
                        $div.css('background-color', $div.text());
                    });
                    this.$elements.bind('click', this, this.colorClick)
                },
                clear: function () {
                    this.constructor.superclass.build.call(this);
                    this.$elements.unbind('click', this, this.colorClick)
                },
                colorClick: function(e) {
                    e.data.$elements.removeClass('mapex-color-active');
                    jQuery(this).addClass('mapex-color-active');
                }
            }
        ));

        // Ballon actions layout
        Mapex.addLayout('mapex#ActionsButtons', ymaps.templateLayoutFactory.createClass(
            '<div class="mapex-actions mapex-clearfix"><input class="mapex-action mapex-btn" id="saveButton" type="button" value="Сохранить"/><a id="deleteButton" href="#" class="mapex-action-right mapex-btn-link">Удалить</a></div>'
        ));
    });
});
