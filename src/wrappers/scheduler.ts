import { Agenda, Job, JobAttributesData } from 'agenda';
import { Service } from 'typedi';

@Service()
export class Scheduler {
  private readonly connectionString: string;
  private agenda?: Agenda;
  private handlers: Array<(...args: unknown[]) => unknown>;

  constructor() {
    this.connectionString = 'mongodb://root:rootpassword@persistence/agenda?authSource=admin';
    this.handlers = [];
  }

  async bootstrap(): Promise<void> {
    this.agenda = new Agenda({ db: { address: this.connectionString } });
    this.agenda.define('ring', {}, this.ring.bind(this));
    await this.agenda.start();
  }

  async schedule(when: Date, data: unknown): Promise<void> {
    await this.agenda?.schedule(when, 'ring', data);
  }

  addHandler(handler: (...args: unknown[]) => unknown): void {
    this.handlers.push(handler);
  }

  private ring(job: Job<JobAttributesData>): void {
    console.log('ring %s', job.attrs.data);
    this.handlers.forEach((handler) => handler(job.attrs.data));
  }
}
