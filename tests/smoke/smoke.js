/*global describe, it, expect, React, ReactIntl*/
describe('React Intl mixin', function () {

    it('Formats numbers correctly', function () {
        var FormattedNumberComponent = React.createClass({
            displayName: 'FormattedNumber',

            mixins: [ReactIntl.Mixin],

            render: function () {
                return React.DOM.div(null, this.formatNumber(1000));
            }
        });

        var FormattedNumber = React.createFactory(FormattedNumberComponent);
        var testNode = document.getElementById('test1');

        React.render(FormattedNumber({
            locales: ['es-AR']
        }), testNode);

        expect(testNode.firstChild.innerHTML).to.equal('1.000');
    });

    it('Formats numbers correctly using IntlNumber component', function () {
        var IntlNumber = React.createFactory(ReactIntl.Number);
        var testNode = document.getElementById('test1');

        React.render(IntlNumber({
            locales: ['es-AR']
        }, 1000), testNode);

        expect(testNode.firstChild.innerHTML).to.equal('1.000');
    });

    it('Formats numbers correctly using named formats', function () {
        var IntlNumber = React.createFactory(ReactIntl.Number);
        var testNode = document.getElementById('test1');

        var price = {
            value: 99.95,
            currency: 'USD'
        };

        React.render(IntlNumber({
            locales: ['en-US'],
            formats: {
                number: {
                    currency: {
                        style: 'currency',
                        minimumFractionDigits: 2
                    }
                }
            },

            format: 'currency',
            currency: price.currency
        }, price.value), testNode);

        expect(testNode.firstChild.innerHTML).to.equal('$99.95');
    });

    it('Formats dates correctly', function () {
        var FormattedDateComponent = React.createClass({
            displayName: 'FormattedDate',

            mixins: [ReactIntl.Mixin],

            render: function () {
                return React.DOM.div(null, this.formatDate(this.props.date, {
                    weekday: 'long',
                    timeZone: 'UTC'
                }));
            }
        });

        var FormattedDate = React.createFactory(FormattedDateComponent);
        var testNode = document.getElementById('test2');

        React.render(FormattedDate({
            locales: ['es-AR'],
            date: Date.UTC(2014, 8, 22, 0, 0, 0, 0)
        }), testNode);

        expect(testNode.firstChild.innerHTML).to.contain('lunes');

        React.render(FormattedDate({
            locales: ['en-US'],
            date: 0
        }), testNode);

        expect(testNode.firstChild.innerHTML).to.contain('Thursday');
    });

    it('Formats dates correctly using IntlDate component', function () {
        var IntlDate = React.createFactory(ReactIntl.Date);
        var testNode = document.getElementById('test2');

        React.render(IntlDate({
            locales: ['es-AR'],
            weekday: 'long',
            timeZone: 'UTC'
        }, Date.UTC(2014, 8, 22, 0, 0, 0, 0)), testNode);

        expect(testNode.firstChild.innerHTML).to.contain('lunes');

        React.render(IntlDate({
            locales: ['en-US'],
            weekday: 'long',
            timeZone: 'UTC'
        }, 0), testNode);

        expect(testNode.firstChild.innerHTML).to.contain('Thursday');
    });

    it('Formats messages correctly', function () {
        var FormattedMessageComponent = React.createClass({
            displayName: 'FormattedMessage',

            mixins: [ReactIntl.Mixin],

            getMyMessage: function () {
                return 'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.';
            },

            render: function () {
                return React.DOM.div(null, this.formatMessage(this.getMyMessage(), {
                    numPhotos: this.props.numPhotos
                }));
            }
        });

        var FormattedMessage = React.createFactory(FormattedMessageComponent);
        var testNode = document.getElementById('test3');

        React.render(FormattedMessage({
            locales: ['en-US'],
            numPhotos: 1
        }), testNode);

        expect(testNode.firstChild.innerHTML).to.equal('You have one photo.');
    });

    it('Formats messages correctly using IntlMessage component', function () {
        var IntlMessage = React.createFactory(ReactIntl.Message);
        var testNode = document.getElementById('test3');

        React.render(IntlMessage({
            locales: ['en-US'],
            numPhotos: 1
        }, 'You have {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}}.'), testNode);

        expect(testNode.firstChild.innerHTML).to.equal('You have one photo.');
    });

});
