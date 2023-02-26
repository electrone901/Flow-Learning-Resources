pub contract Tasks {
// Define the user struct
  pub struct User {
    pub let walletAddress: String
    pub let name: String
    pub var points: Int
    pub var numOfTasks: Int
    pub var arrayOfBountiesCompleted: [String]

    init(walletAddress: String, name:String, points: Int, numOfTasks: Int, arrayOfBountiesCompleted:Int) {
        self.walletAddress = walletAddress
        self.name = name
        self.points = points
        self.numOfTasks = numOfTasks
        self.arrayOfBountiesCompleted=[]
    }
  }

  // Define the users dictionary
  //pub var users: {String: User}

    pub resource TaskList  {
        pub var tasks: [String]
        pub var usersArray: [String]
        init() {
            self.tasks = []
            self.usersArray = []
        }

        pub fun addTask(task: String) {
            self.tasks.append(task)
        }

        pub fun addUser(walletAddress: String) {
            //var newUser = user.createUser(walletAddress: String, name:String, points:Int, numOfTasks:Int,
        //arrayOfBountiesCompleted: Int)
            self.usersArray.append(walletAddress)
        }

        //no using
        pub fun removeTask(idx: Integer) {
            self.tasks.remove(at: idx)
        }
    }

    pub fun createTaskList(): @TaskList {
        let myTaskList <- create TaskList()
        return <- myTaskList
    }

    //- function that creates a task(takes: id, owner, & CID)

   //- function that createUserProfile(takes: walletaddress, points=0, bountiesNum=0, arrayOfBountiesByID=[])
    pub resource user {
        pub let walletAddress: String
        pub let name: String
        pub var points: Int
        pub var numOfTasks: Int
        pub var arrayOfBountiesCompleted: [String]

        init(walletAddress: String, name:String, points: Int, numOfTasks: Int, arrayOfBountiesCompleted:Int) {
            self.walletAddress = walletAddress
            self.name = name
            self.points = points
            self.numOfTasks = numOfTasks
            self.arrayOfBountiesCompleted=[]
        }

        // Create a new user
        pub fun createUser(walletAddress: String, name:String, points:Int, numOfTasks:Int,
        arrayOfBountiesCompleted: Int): @user {

            return <-create user(walletAddress: walletAddress, name:name, points: points, numOfTasks:numOfTasks, arrayOfBountiesCompleted:arrayOfBountiesCompleted )
        }

   //- function to updatePoints(takes: walletaddress, pointsToAdd) then increase bountiesNum+1  & then push  to arrayOfBountiesByID(take: bountyID)
        pub fun updateUser(points:Int, cid:String) {
            self.points=self.points + points
            self.numOfTasks=self.numOfTasks+1
            self.arrayOfBountiesCompleted.append(cid)
        }
    }

    // now I need to create an array of users
}
