nodepress.controller('CommentsCtrl',  WithAjaxCtrl);


function WithAjaxCtrl(DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('https://l-lin.github.io/angular-datatables/data.json')
        .withPaginationType('full_numbers')
	    .withColumnFilter({
	        aoColumns: [{
	            type: 'number'
	        }, {
	            type: 'text',
	            bRegex: true,
	        }, {
	            type: 'select',
	            bRegex: false
	        }]
	    });

    vm.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('firstName').withTitle('First name'),
        DTColumnBuilder.newColumn('lastName').withTitle('Last name')
    ];
}
