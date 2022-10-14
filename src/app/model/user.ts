export class User {
    id: string = '';
    emailAddress: string = '';
    firstName: string = '';
    lastName: string = '';
    localeForDisplay: string = 'en_US';

    public setId(id: string) : User {
      this.id = id;
      return this;
    }

    public setEmailAddress(emailAddress: string) : User {
      this.emailAddress = emailAddress;
      return this;
    }

    public setFirstName(firstName: string) : User {
      this.firstName = firstName;
      return this;
    }

    public setLastName(lastName: string) : User {
      this.lastName = lastName;
      return this;
    }
}
