using System;
using System.Collections.Generic;
using MoneyManagerBackend.Domains;

namespace MoneyManagerBackend.Services
{
    public interface IMovementService
    {
        public List<Movement> GetMovements();

        public Movement GetMovementById(int movementId);

        public bool UpdateMovement(Movement movement);
        public bool DelteMovement(int movementId);

    }
}