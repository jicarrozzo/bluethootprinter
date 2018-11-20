export class Ticket {
	public ticket: string;
	public Lastname: string;
	public name: string;
	public documentType: string;
	public document: string;
	public from: string;
	public to: string;
	public dtDeparture: string;
	public seat: string;
	constructor() {}
}

export class TestTickets {
	list: Ticket[];
	constructor() {
		this.list = new Array<Ticket>();
		let a: Ticket = new Ticket();
		a.ticket = 'AAA-001';
		a.Lastname = 'Putin';
		a.name = 'Vladimir';
		a.documentType = 'PAS';
		a.document = '12569856';
		a.from = 'Moscow';
		a.to = 'St. Petersburg';
		a.dtDeparture = '10/12/2018 20:30';
		a.seat = '01';
		this.list.push(a);

		a = new Ticket();
		a.ticket = 'AAA-002';
		a.Lastname = 'Ulyanov';
		a.name = 'Vladimir Ilyich';
		a.documentType = 'PAS';
		a.document = '0256985';
		a.from = 'Posadas';
		a.to = 'Santo Pipo';
		a.dtDeparture = '11/12/2018 05:30';
		a.seat = '03';
		this.list.push(a);

		// a = new Ticket();
		// a.ticket = 'AAA-003';
		// a.Lastname = 'Yeltsin';
		// a.name = 'Boris Nikolayevich';
		// a.documentType = 'PAS';
		// a.document = '58965896';
		// a.from = 'Barcelona';
		// a.to = 'Madrid';
		// a.dtDeparture = '02/12/2018 12:15';
		// a.seat = '33';
		// this.list.push(a);
	}
}
