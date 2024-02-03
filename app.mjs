const body = document.querySelector("#body");
const container = document.querySelector("#container");
const CandidateList = document.querySelector("#CandidateList");
const VotingContainer = document.querySelector("#VotingContainer");
const CandidateElements = [];

container.innerHTML = `<center>
<div>
    <div class="form-group"id="add-candidate-container">
        <label for="new-candidate" class="w-50"><b>Enter Candidate Name:</b></label>
        <input type="text" id="new-candidate" placeholder="Enter Candidate Who Elected By Election Commission" class="form-control geta w-25 mt-2">
        <br>
        <input class="w-25 bata" type="submit" onclick="addNewCandidate()" value="ADD Candidate">
    </div>
</div>
</center>`


document.addEventListener("DOMContentLoaded", function () {
    function createCandidateElements(candidateName) {
        // Create a new div element for each candidate
        let candidateDiv = document.createElement("div");
        candidateDiv.textContent = candidateName;

        // Create a voting counter for each candidate
        let counterDiv = document.createElement("div");
        counterDiv.textContent = "0";

        // Create voting buttons for each candidate
        let voteButton = createButton("Vote", function() {
            increment(counterDiv);
        });

        // Create reset button for each candidate
        let resetButton = createButton("Reset", function() {
            reset(counterDiv);
        });

        // Create clear button for each candidate
        let clearButton = createButton("Clear", function() {
            clearCandidate(candidateDiv);
        });

        // Append candidate content, counter, and buttons to the main div
        candidateDiv.appendChild(counterDiv);
        candidateDiv.appendChild(voteButton);
        candidateDiv.appendChild(resetButton);
        candidateDiv.appendChild(clearButton);

        // Append the new div to the voting container
        VotingContainer.appendChild(candidateDiv);

        // Add the candidate element to the array
        CandidateElements.push({
            name: candidateName,
            div: candidateDiv,
            counter: counterDiv
        });
    }

    function createButton(text, clickHandler) {
        var button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", clickHandler);
        return button;
    }

    function increment(counterDiv) {
        counterDiv.textContent = parseInt(counterDiv.textContent) + 1;
    }

    function reset(counterDiv) {
        counterDiv.textContent = "0";
    }

    function clearCandidate(candidateDiv) {
        // Remove the candidate and associated elements from the voting container
        candidateDiv.parentNode.removeChild(candidateDiv);
        // Remove the candidate element from the array
        CandidateElements = CandidateElements.filter(function(candidate) {
            return candidate.div !== candidateDiv;
            
        });
    }

    // Function to add a new candidate based on user input
    window.addNewCandidate = function() {
        const newCandidateInput = document.getElementById("new-candidate");
        const newCandidateName = newCandidateInput.value.trim();

        if (newCandidateName !== "") {
            // Create a new list item for the new candidate
            const newCandidateListItem = document.createElement("li");
            newCandidateListItem.textContent = newCandidateName;

            // Append the new candidate to the candidates list
            CandidateList.appendChild(newCandidateListItem);

            // Create elements for the new candidate in the voting container
            createCandidateElements(newCandidateName);

            // Clear the input field
            newCandidateInput.value = "";
        }
    };

    // Function to determine the winner
    window.getWinner = function() {
        const maxVotes = -1;
        const winner = null;

        CandidateElements.forEach(function(candidate) {
            const votes = parseInt(candidate.counter.textContent);

            if (votes > maxVotes) {
                maxVotes = votes;
                winner = candidate.name;
            }
        });

        if (winner !== null) {
            alert("ELECTED: " + winner);
        } else {
            alert("THE SYSTEM IS DETECTED THAT NO VOTE WAS CAST !!!");
        }
    };

    // Initial creation of candidate elements
    const candidateItems = CandidateList.getElementsByTagName("li");

    for (let i = 0; i < candidateItems.length; i++) {
        createCandidateElements(candidateItems[i].textContent.trim());
    }
});