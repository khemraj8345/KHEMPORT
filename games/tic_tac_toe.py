"""
Tic Tac Toe Game with AI opponent using Minimax algorithm
"""

def check_winner(board):
    """Check if there's a winner on the board"""
    lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    
    for line in lines:
        a, b, c = line
        if board[a] and board[a] == board[b] == board[c]:
            return board[a]
    return None

def is_board_full(board):
    """Check if the board is full"""
    return all(cell is not None for cell in board)

def minimax(board, depth, is_maximizing):
    """Minimax algorithm for AI decision making"""
    result = check_winner(board)
    
    if result == 'O':
        return 10 - depth
    if result == 'X':
        return depth - 10
    if is_board_full(board):
        return 0

    if is_maximizing:
        best_score = float('-inf')
        for i in range(9):
            if board[i] is None:
                board[i] = 'O'
                score = minimax(board, depth + 1, False)
                board[i] = None
                best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(9):
            if board[i] is None:
                board[i] = 'X'
                score = minimax(board, depth + 1, True)
                board[i] = None
                best_score = min(score, best_score)
        return best_score

def get_best_move(board):
    """Find the best move for the AI"""
    best_score = float('-inf')
    best_move = None

    for i in range(9):
        if board[i] is None:
            board[i] = 'O'
            score = minimax(board, 0, False)
            board[i] = None
            if score > best_score:
                best_score = score
                best_move = i
    return best_move

def display_board(board):
    """Display the board in a formatted way"""
    print("\n")
    for i in range(3):
        row = []
        for j in range(3):
            index = i * 3 + j
            cell = board[index] if board[index] else str(index + 1)
            row.append(cell)
        print(f" {row[0]} | {row[1]} | {row[2]} ")
        if i < 2:
            print("-----------")
    print("\n")

def play_game():
    """Main game loop"""
    board = [None] * 9
    player_score = 0
    ai_score = 0
    draws = 0

    print("Welcome to Tic Tac Toe!")
    print("You are X, AI is O")
    print("Enter position (1-9) to make your move\n")

    while True:
        display_board(board)
        
        # Player move
        while True:
            try:
                move = int(input("Your move (1-9): ")) - 1
                if 0 <= move < 9 and board[move] is None:
                    board[move] = 'X'
                    break
                else:
                    print("Invalid move! Try again.")
            except ValueError:
                print("Please enter a number between 1 and 9")

        winner = check_winner(board)
        if winner == 'X':
            display_board(board)
            print("🎉 You Win!")
            player_score += 1
        elif is_board_full(board):
            display_board(board)
            print("🤝 Draw!")
            draws += 1
        else:
            # AI move
            print("AI is thinking...")
            best_move = get_best_move(board)
            if best_move is not None:
                board[best_move] = 'O'

            winner = check_winner(board)
            if winner == 'O':
                display_board(board)
                print("🤖 AI Wins!")
                ai_score += 1
            elif is_board_full(board):
                display_board(board)
                print("🤝 Draw!")
                draws += 1
            else:
                continue

        # Show scores
        print(f"Scores - You: {player_score}, AI: {ai_score}, Draws: {draws}")
        
        play_again = input("Play again? (yes/no): ").lower()
        if play_again != 'yes' and play_again != 'y':
            print("Thanks for playing!")
            break
        
        board = [None] * 9

if __name__ == "__main__":
    play_game()