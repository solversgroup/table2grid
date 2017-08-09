;(function($) {

    $.table2grid = function(selector) {

        var $tables       = $(selector);
        var aTables       = [];
        var iterator      = 0;
        var elResultIndex = 0;
        var delimiter     = true;

        var classes = {
            main         : 'table2grid',
            list         : 'table2grid__list',
            item         : 'table2grid__item',
            block        : 'table2grid-block',
            blockContent : 'table2grid-block__content'
        };

        $.each($tables, function(tableIndex, table) {

            var aCrashParams = $(table).data('tableCrash').toString().split(',');
            var uID          = $(table).data('tableUid');

            aTables[tableIndex] = {};
            aTables[tableIndex].colsCount = $(table).find('tr:first-child td').length;
            aTables[tableIndex].rowsInElement = aCrashParams[0];
            aTables[tableIndex].elements = [];

            iterator = 0;

            $.each($(table).find('tr'), function(trIndex, trContent) {

                iterator++;

                delimiter = iterator % aTables[tableIndex].rowsInElement;

                $.each($(trContent).find('td'), function(tdIndex, tdContent) {

                    //console.log(elResultIndex);

                    if (typeof aTables[tableIndex].elements[elResultIndex] === 'undefined') {
                        aTables[tableIndex].elements[elResultIndex] = $('<div class=' + classes.block + '></div>');
                    }

                    aTables[tableIndex].elements[elResultIndex].append($('<div class="' + classes.blockContent + '">' + $(tdContent).html() + '</div>'));

                    elResultIndex++;

                    if (delimiter && tdIndex == (aTables[tableIndex].colsCount - 1)) {
                        //console.info('end row');
                        elResultIndex = elResultIndex - aTables[tableIndex].colsCount;
                    }

                });

                if (!delimiter) {
                    //console.warn('row end');
                    elResultIndex = elResultIndex;
                }

            });

            elResultIndex = 0;

            var $crashTableGrid = $('<div class="' + classes.main + '"></div>');
            var $crashTableGridList = $('<div class="' + classes.list + '"></div>');
            var $crashTableGridItem = $('<div class="' + classes.item + '"></div>');

            if (aCrashParams.length > 1) {

                var elementsLenth = aTables[tableIndex].elements.length;
                var horizontalCounter = 0;

                $.each(aTables[tableIndex].elements, function(curIndex, curElement) {

                    if (horizontalCounter <= aCrashParams[1]) {

                        $(curElement).addClass(classes.block + '--' + horizontalCounter);

                        $crashTableGridItem.append($(curElement));
                    }

                    horizontalCounter++;

                    if (horizontalCounter == aCrashParams[1]) {

                        $crashTableGridList.append($crashTableGridItem);
                        $crashTableGridItem = $('<div class="' + classes.item + '"></div>');
                        horizontalCounter = 0;  
                    }

                });

                $crashTableGrid
                    .addClass(classes.main + '--' + (aTables[tableIndex].colsCount / aCrashParams[1]) + ' ' + classes.main + '--horizontal');

            } else {

                $.each(aTables[tableIndex].elements, function(curIndex, curElement) {

                    $crashTableGridItem = $('<div class="' + classes.item + '"></div>');
                    $crashTableGridItem.append($(curElement));
                    $crashTableGridList.append($crashTableGridItem);
                });

                $crashTableGrid
                    .addClass(classes.main + '--' + aTables[tableIndex].colsCount + ' ' + classes.main + '--vertical');

            }

            $(table).addClass(classes.main + '--crashed');

            $crashTableGrid
                .addClass(uID ? classes.main + '--' + uID : '')
                .append($crashTableGridList);

            $(table).after($crashTableGrid);

        });

    }

    $.table2grid('[data-table-crash]');

})(jQuery);
